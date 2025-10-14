import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CardItem() {
  return (
    <Card className="max-w-[350px]">
      <CardHeader>
        <CardDescription>Author name</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          Book Name
        </CardTitle>
        <CardAction className="flex flex-col items-end gap-2">
          <Badge variant="outline">Total: 10</Badge>
          <Badge variant="outline">Available: 06</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        odio itaque porro cupiditate mollitia deleniti saepe, eveniet tenetur
        earum! Exercitationem cum, dolores atque labore nisi id quia obcaecati
        temporibus excepturi!
      </CardFooter>
    </Card>
  );
}
