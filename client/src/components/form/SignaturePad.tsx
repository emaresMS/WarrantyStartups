import { useRef, useEffect, useState } from 'react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'

interface SignaturePadProps {
  label: string
  value?: string
  onChange?: (dataUrl: string) => void
  error?: string
  required?: boolean
}

export function SignaturePad({ label, value, onChange, error, required }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isEmpty, setIsEmpty] = useState(!value)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !value) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = new Image()
    img.onload = () => ctx.drawImage(img, 0, 0)
    img.src = value
  }, [])

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const point = 'touches' in e ? e.touches[0] : e
    return { x: point.clientX - rect.left, y: point.clientY - rect.top }
  }

  function startDrawing(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault()
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const { x, y } = getPos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.strokeStyle = '#22C55E'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    setIsDrawing(true)
    setIsEmpty(false)
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing) return
    e.preventDefault()
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const { x, y } = getPos(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  function stopDrawing() {
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = canvasRef.current!
    onChange?.(canvas.toDataURL())
  }

  function clear() {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setIsEmpty(true)
    onChange?.('')
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-fg-secondary">
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
        {!isEmpty && (
          <Button variant="ghost" size="sm" onClick={clear} type="button">
            Clear
          </Button>
        )}
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={160}
        className={cn(
          'w-full touch-none rounded-md border border-border-primary bg-surface-primary cursor-crosshair',
          error && 'border-error',
        )}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      {isEmpty && <p className="text-center text-xs text-fg-muted">Sign above</p>}
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  )
}
