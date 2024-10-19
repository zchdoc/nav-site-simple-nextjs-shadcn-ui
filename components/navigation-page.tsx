"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { LinkGroup } from "@/components/link-group"
import { RemoveDuplicates } from "@/components/remove-duplicates"
import { Braces } from "lucide-react"

export function NavigationPage() {
  const [showHidden, setShowHidden] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">常用链接</h1>
        <ModeToggle />
      </div>

      <LinkGroup
        title="Singbon"
        linksPerRow={6}
        links={[
          { name: "景安1", url: "http://1.singbon.com:81" },
          { name: "阿里A2", url: "http://a2.4000063966.com:81" },
          { name: "阿里A3", url: "http://a3c.4000063966.com:8081" },
          { name: "阿里A4", url: "http://a4c.4000063966.com:8081" },
          { name: "许昌1充电桩ID", url: "http://cdz.4000063966.com:8081" },
          { name: "阿里A5共享充电桩", url: "http://chongdian.4000063966.com:81" },
          // row 2
          { name: "景安1后台", url: "http://1.singbon.com:81/xb/login.do" },
          { name: "阿里A2后台", url: "http://a2.4000063966.com:81/xb/login.do" },
          { name: "阿里A3后台", url: "http://a3c.4000063966.com:8081/xb/login.do" },
          { name: "阿里A4后台", url: "http://a4c.4000063966.com:8081/xb/login.do" },
          { name: "许昌1充电桩ID后台", url: "http://cdz.4000063966.com:8084/login" },
          { name: "阿里A5共享充电桩后台", url: "http://chongdian.4000063966.com:81/singbon/backgroud/system/admin/login.do" },
          // row 3
          { name: "景安1账号查询", url: "http://1.singbon.com:81/netInterface/singbon/companyIndex.do" },
          { name: "阿里A2账号查询", url: "http://a2.4000063966.com:81/netInterface/singbon/companyIndex.do" },
          { name: "阿里A3账号查询", url: "http://a3c.4000063966.com:8081/netInterface/singbon/companyIndex.do" },
          { name: "阿里A4账号查询", url: "http://a4c.4000063966.com:8081/netInterface/singbon/companyIndex.do" },
          { name: "许昌1充电桩ID账号查询", url: "http://cdz.4000063966.com:8081/netInterface/singbon/companyIndex.do" },
          { name: "云平台信息查询", url: "../xb-tools/xb-encrypt-js.html" },
        ]}
      />

      <LinkGroup
        title="工具"
        linksPerRow={6}
        links={[
          { name: "兴邦设备费率计算", url: "/pulse-water-billing-calc" },
          { name: "元素去重", url: "/remove-duplicates" },
          { name: "qr-gen", url: "../qr-styling/index.html" },
          { name: "bs-custom", url: "../chrome-bookmarks-simple/index.html?name=bscus" },
          { name: "bs-custom-jrh", url: "../chrome-bookmarks-simple/index.html?name=嘉荣华" },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>
            <Button onClick={() => setShowHidden(!showHidden)}>{showHidden ? "Hide" : "Show"} Additional Links</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showHidden && (
            <>
              <LinkGroup
                title="Search Engines"
                links={[
                  { name: "Google", url: "https://www.google.com" },
                  { name: "DuckDuckGo", url: "https://www.duckduckgo.com" },
                  { name: "Bing", url: "https://www.bing.com" },
                  { name: "Baidu", url: "https://www.baidu.com" },
                  { name: "Sogou", url: "https://www.sogou.com" },
                  { name: "360", url: "https://www.so.com/" },
                ]}
              />

              <LinkGroup
                title="Social Media"
                links={[
                  { name: "X", url: "https://x.com/" },
                  { name: "Reddit", url: "https://www.reddit.com" },
                  { name: "Telegram", url: "https://web.telegram.org/a/" },
                  { name: "Discord", url: "https://discord.com/channels/@me" },
                  { name: "Linux.do", url: "https://linux.do/" },
                  { name: "Zhihu", url: "https://www.zhihu.com" },
                  { name: "52pj", url: "https://www.52pojie.cn/" },
                ]}
              />

              <LinkGroup
                title="Git"
                links={[
                  { name: "GitHub", url: "https://github.com/zchdoc" },
                  { name: "Gitee", url: "https://gitee.com/" },
                  { name: "CodeUp", url: "https://codeup.aliyun.com/" },
                  { name: "GitLab", url: "https://gitlab.com/" },
                  { name: "CSDN Git", url: "https://gitcode.com/" },
                  { name: "GitHub Trending", url: "https://github.com/trending?since=monthly" },
                ]}
              />

              <LinkGroup
                title="AI"
                links={[
                  { name: "Coze.en", url: "https://www.coze.com/space/7322025004764364806/bot" },
                  { name: "Cocici", url: "https://www.ciciai.com/" },
                  { name: "OpenAI", url: "https://chat.openai.com/" },
                  { name: "Claude", url: "https://claude.ai/new" },
                  { name: "Groq", url: "https://groq.com/" },
                  { name: "Mistral", url: "https://chat.mistral.ai/chat" },
                  { name: "Perplexity", url: "https://www.perplexity.ai/" },
                  { name: "Gemini", url: "https://gemini.google.com/app" },
                ]}
              />

              <LinkGroup
                title="Translation"
                links={[
                  { name: "Google Translate", url: "https://translate.google.com" },
                  { name: "Bing Translator", url: "https://cn.bing.com/translator" },
                  { name: "DeepL", url: "https://www.deepl.com/zh/translator" },
                  { name: "Google Translate (ZH)", url: "https://translate.google.com.hk/?hl=zh-CN&sl=auto&tl=en&op=translate" },
                  { name: "Baidu Translate", url: "https://fanyi.baidu.com/" },
                  { name: "Youdao Translate", url: "https://fanyi.youdao.com/#/" },
                ]}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
