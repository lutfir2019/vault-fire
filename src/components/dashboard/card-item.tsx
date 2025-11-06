import type { TKey } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  Globe,
  Pen,
  Trash2,
  User,
  Lock,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface CardItemProps {
  item: TKey;
  handleCopy: (text: string | undefined, field: string) => void;
  copiedField: string | null;
  showPassword: Record<string, boolean>;
  togglePassword: (id: string) => void;
  onClickEdit: (val: TKey) => void;
  onClickDelete: (val: TKey) => void;
}

function CardItem({
  item,
  handleCopy,
  copiedField,
  showPassword,
  togglePassword,
  onClickDelete,
  onClickEdit,
}: Readonly<CardItemProps>) {
  const isPublic = item.type === "public";
  return (
    <Card
      key={item.id}
      className="border col-span-2 sm:col-span-1 rounded-xl shadow-xs hover:shadow-md transition-all gap-2"
    >
      <CardHeader className="flex justify-center">
        {isPublic ? (
          <Badge variant="outline">
            <Globe />
            Public
          </Badge>
        ) : (
          <Badge variant="secondary">
            <Lock />
            Private
          </Badge>
        )}
      </CardHeader>
      <CardContent className="relative space-y-2 text-sm text-muted-foreground">
        {/* URL */}
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate hover:underline text-foreground/90 flex-1"
            >
              {item.url}
            </a>
          ) : (
            <span className="flex-1">-</span>
          )}
          <Button
            size="icon-sm"
            variant="ghost"
            title="Copy URL"
            onClick={() => handleCopy(item.url, `${item.id}-url`)}
          >
            {copiedField === `${item.id}-url` ? (
              <span className="text-xs text-green-500">✓</span>
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Separator />

        {/* Username */}
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="truncate flex-1">{item.username ?? "-"}</span>
          <Button
            size="icon-sm"
            variant="ghost"
            title="Copy Username"
            onClick={() => handleCopy(item?.username, `${item.id}-user`)}
          >
            {copiedField === `${item.id}-user` ? (
              <span className="text-xs text-green-500">
                <Check />
              </span>
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Separator />

        {/* Password */}
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span className="truncate flex-1">
            {showPassword[item.id as string] ? item.password : "•".repeat(8)}
          </span>

          {/* Tombol Show/Hide */}
          <Button
            size="icon-sm"
            variant="ghost"
            title={
              showPassword[item.id as string]
                ? "Hide Password"
                : "Show Password"
            }
            onClick={() => togglePassword(item.id as string)}
          >
            {showPassword[item.id as string] ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>

          {/* Tombol Copy */}
          <Button
            size="icon-sm"
            variant="ghost"
            title="Copy Password"
            onClick={() => handleCopy(item.password, `${item.id}-pass`)}
          >
            {copiedField === `${item.id}-pass` ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Separator />

        {/* Description */}
        <div className="h-20 overflow-auto wrap-normal border rounded-md px-2.5 py-1 text-xs">
          {item?.description ?? "-"}
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2 justify-end mt-auto">
        <Button
          size="icon-sm"
          title="Edit"
          className="w-full"
          variant="outline"
          onClick={() => onClickEdit(item)}
        >
          <Pen />
        </Button>
        <Button
          size="icon-sm"
          title="Delete"
          className="w-full"
          variant="destructive"
          onClick={() => onClickDelete(item)}
        >
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardItem;
