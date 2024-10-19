import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Link {
  name: string
  url: string
}

interface LinkGroupProps {
  title: string
  links: Link[]
  // 新增属性，表示每行链接的个数
  linksPerRow?: number
}

export function LinkGroup({ title, links, linksPerRow = 10 }: LinkGroupProps) {
  // 根据linksPerRow计算grid-template-columns的值
  const gridColumns = `repeat(${linksPerRow}, 1fr)`

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent
        className={`grid grid-cols-${gridColumns} gap-2`} // 使用CSS Grid布局，并设置列数和间隔
        style={{ gridTemplateColumns: gridColumns }} // 也可以通过style属性直接设置
      >
        {links.map((link) => (
          <Button key={link.name} variant="outline" asChild>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
