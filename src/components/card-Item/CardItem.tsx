import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardItemProps } from "@/types/CardItemProps";
import Image from "next/image";

export default function CardItem({
  coverImage,
  title,
  description,
  author,
  genre,
  total,
  available,
}: CardItemProps) {
  return (
    <Card className="gap-0 overflow-hidden h-full flex flex-col">
      <CardHeader className="h-[120px] p-4">
        <div className="flex gap-4 items-start">
          {coverImage && (
            <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={coverImage}
                alt={title || "Book cover"}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {title}
            </CardTitle>
            {author && (
              <p className="text-sm text-muted-foreground mt-1">{author}</p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardFooter className="flex flex-col items-start gap-3 pt-3 flex-1">
        <div className="flex flex-wrap gap-2">
          {genre && <Badge variant="outline">{genre}</Badge>}
          {total !== undefined && (
            <Badge variant="outline">Total: {total}</Badge>
          )}
          {available !== undefined && (
            <Badge variant="outline">Available: {available}</Badge>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
