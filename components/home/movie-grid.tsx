const moviePosters = [
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
];

export function MovieGrid() {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {moviePosters.map((poster, index) => (
        <div key={index} className="aspect-[2/3]">
          <img
            src={poster}
            alt={`Movie poster ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
