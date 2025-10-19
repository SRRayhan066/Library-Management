import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardItemProps } from "@/types/CardItemProps";

export default function CardItem({
  title,
  description,
  message,
  total,
  available,
}: CardItemProps) {
  return (
    <Card className=""> 
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {title}
        </CardTitle>
        <CardAction className="flex flex-col items-end gap-2">
          {total && <Badge variant="outline">Total: {total}</Badge>}
          {available && <Badge variant="outline">Available: {available}</Badge>}
        </CardAction>
      </CardHeader>
      <CardFooter className="text-sm">{message}</CardFooter>
    </Card>
  );
}

//max-w-[350px]
