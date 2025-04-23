'use client'

export function BlurredNavbarBg() {
  const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."; // Paste your full base64 string here

  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/30" />
      <img
        src={base64Image}
        alt="Navbar Background"
        className="object-cover w-full h-full blur-md opacity-70"
      />
    </div>
  )
}