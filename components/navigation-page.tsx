"use client";
import {useState, useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ModeToggle} from "@/components/mode-toggle";
import {LinkGroup} from "@/components/link-group";
import {ChevronRight} from "lucide-react";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {RainbowButton} from "@/components/ui/rainbow-button";
import {Mail} from "lucide-react";
import {UnlockIcon} from "lucide-react";
import PasswordDialog from "./PasswordDialog";

export function NavigationPage() {
  const [showHidden, setShowHidden] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // 在组件挂载时检查本地存储中的验证状态
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    if (storedAuthStatus === "true") {
      setIsPasswordCorrect(true);
    }
  }, []);

  const handlePasswordSubmit = () => {
    if (password === "15824821718") {
      setIsPasswordCorrect(true);
      setShowHidden(true);
      setIsDialogOpen(false);
      // 在本地存储中保存验证状态
      localStorage.setItem("isAuthenticated", "true");
    }
    else {
      alert("Incorrect password");
    }
  };

  const toggleHiddenLinks = () => {
    if (showHidden) {
      setShowHidden(false);
    }
    else {
      if (isPasswordCorrect) {
        // 如果已经验证过密码，直接显示链接
        setShowHidden(true);
      }
      else {
        // 如果还没有验证过密码，显示密码对话框
        setIsDialogOpen(true);
      }
    }
  };

  // 添加登出功能（可选）
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsPasswordCorrect(false);
    setShowHidden(false);
    setPassword("");
  };

  // 其余代码保持不变...
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude: ", position.coords.latitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log("Location:", position);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
    else {
      console.log("Geolocation is not available in your browser.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">常用链接</h1>
        <div className="flex items-center gap-2">
          {isPasswordCorrect && (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Reset Auth
            </Button>
          )}
          <ModeToggle/>
        </div>
      </div>
      {location && (
        <Card>
          <CardHeader>
            <CardTitle>Your Location</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </CardContent>
        </Card>
      )}
      <LinkGroup
        title="Singbon"
        linksPerRow={6}
        links={[
          {name: "景安1", url: "http://1.singbon.com:81"},
          {name: "阿里A2", url: "http://a2.4000063966.com:81"},
          {name: "阿里A3", url: "http://a3c.4000063966.com:8081"},
          {name: "阿里A4", url: "http://a4c.4000063966.com:8081"},
          {name: "许昌1充电桩ID", url: "http://cdz.4000063966.com:8081"},
          {
            name: "阿里A5共享充电桩",
            url: "http://chongdian.4000063966.com:81",
          },
          // row 2
          {name: "景安1后台", url: "http://1.singbon.com:81/xb/login.do"},
          {
            name: "阿里A2后台",
            url: "http://a2.4000063966.com:81/xb/login.do",
          },
          {
            name: "阿里A3后台",
            url: "http://a3c.4000063966.com:8081/xb/login.do",
          },
          {
            name: "阿里A4后台",
            url: "http://a4c.4000063966.com:8081/xb/login.do",
          },
          {
            name: "许昌1充电桩ID后台",
            url: "http://cdz.4000063966.com:8084/login",
          },
          {
            name: "阿里A5共享充电桩后台",
            url: "http://chongdian.4000063966.com:81/singbon/backgroud/system/admin/login.do",
          },
          // row 3
          {
            name: "景安1账号查询",
            url: "http://1.singbon.com:81/netInterface/singbon/companyIndex.do",
          },
          {
            name: "阿里A2账号查询",
            url: "http://a2.4000063966.com:81/netInterface/singbon/companyIndex.do",
          },
          {
            name: "阿里A3账号查询",
            url: "http://a3c.4000063966.com:8081/netInterface/singbon/companyIndex.do",
          },
          {
            name: "阿里A4账号查询",
            url: "http://a4c.4000063966.com:8081/netInterface/singbon/companyIndex.do",
          },
          {
            name: "许昌1充电桩ID账号查询",
            url: "http://cdz.4000063966.com:8081/netInterface/singbon/companyIndex.do",
          },
          {name: "云平台信息查询", url: "../xb-tools/xb-encrypt-js.html"},
        ]}
      />
      <LinkGroup
        title="工具"
        linksPerRow={6}
        links={[
          {name: "电磁阀费率计算", url: "/pulse-water-billing-calc"},
          {name: "二维码生成(UNDO)", url: "../qr-styling/index.html"},
          {name: "元素去重", url: "/remove-duplicates"},
          {name: "随机数生成器(UNDO)", url: "/remove-duplicates"},
          {name: "进制转换(UNDO)", url: "/remove-duplicates"},
          {name: "金额大小写转换(UNDO)", url: "/remove-duplicates"},
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>
            <RainbowButton onClick={toggleHiddenLinks} className="ml-2">
              {showHidden ? "Hide" : "Show More"}
            </RainbowButton>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showHidden && (
            <>
              <LinkGroup
                title="工具"
                linksPerRow={6}
                links={[
                  {name: "Attendance", url: "/attendance"},
                  {name: "AttendanceSimple", url: "/attendance-simple"}
                ]}
              />
              <LinkGroup
                title="Search Engines"
                links={[
                  {name: "Google", url: "https://www.google.com"},
                  {name: "DuckDuckGo", url: "https://www.duckduckgo.com"},
                  {name: "Bing", url: "https://www.bing.com"},
                  {name: "Baidu", url: "https://www.baidu.com"},
                  {name: "Sogou", url: "https://www.sogou.com"},
                  {name: "360", url: "https://www.so.com/"},
                ]}
              />
              <LinkGroup
                title="Social Media"
                links={[
                  {name: "X(Twitter)", url: "https://x.com/"},
                  {name: "Reddit", url: "https://www.reddit.com"},
                  {name: "Telegram", url: "https://web.telegram.org/a/"},
                  {name: "Discord", url: "https://discord.com/channels/@me"},
                  {name: "Ins", url: "https://www.instagram.com/"},
                  {name: "Linux.do", url: "https://linux.do/"},
                  {name: "Zhihu", url: "https://www.zhihu.com"},
                  {name: "52PJ", url: "https://www.52pojie.cn/"},
                ]}
              />
              <LinkGroup
                title="Git"
                links={[
                  {name: "GitHub", url: "https://github.com/zchdoc"},
                  {name: "Gitee", url: "https://gitee.com/"},
                  {name: "CodeUp", url: "https://codeup.aliyun.com/"},
                  {name: "GitLab", url: "https://gitlab.com/"},
                  {name: "CSDN Git", url: "https://gitcode.com/"},
                  {
                    name: "GitHub Trending",
                    url: "https://github.com/trending?since=monthly",
                  },
                ]}
              />
              <LinkGroup
                linksPerRow={8}
                title="AI"
                links={[
                  {name: "OpenAI", url: "https://chat.openai.com/"},
                  {name: "Claude", url: "https://claude.ai/new"},
                  {name: "Groq", url: "https://groq.com/"},
                  {name: "Mistral", url: "https://chat.mistral.ai/chat"},
                  {name: "Gemini", url: "https://gemini.google.com/app"},
                  {name: "Perplexity", url: "https://www.perplexity.ai/"},
                  {name: "OLlaMa", url: "https://ollama.ai/"},
                  {
                    name: "R-OpenRouter",
                    url: "https://openrouter.ai/rankings",
                  },
                  {
                    name: "R-LMsys",
                    url: "https://chat.lmsys.org/?leaderboard",
                  },
                  {
                    name: "R-Aider",
                    url: "https://aider.chat/docs/leaderboards",
                  },
                  {name: "R-SuperClue", url: "https://www.superclueai.com"},
                  {name: "HuggingFace", url: "https://huggingface.co/"},
                  {name: "HuggingChat", url: "https://huggingface.co/chat/"},
                  {name: "OpenRChat", url: "https://openrouter.ai/chat"},
                  {
                    name: "CozeEn",
                    url: "https://www.coze.com/space/7322025004764364806/bot",
                  },
                  {name: "CiCi", url: "https://www.ciciai.com/"},
                ]}
              />
              <LinkGroup
                linksPerRow={6}
                title="AI-CN"
                links={[
                  {
                    name: "CoZeCn",
                    url: "https://www.coze.cn/space/7346541960162869283/bot",
                  },
                  {name: "DouBao", url: "https://www.doubao.com/chat/"},
                  {name: "MoonShot", url: "https://kimi.moonshot.cn/"},
                  {name: "TongYi", url: "https://tongyi.aliyun.com/"},
                  {name: "ChatGlm", url: "https://chatglm.cn/detail"},
                  {name: "DeepSeek", url: "https://chat.deepseek.com/coder"},
                  {name: "BaiduYiYan", url: "https://yiyan.baidu.com/"},
                  {name: "HunYuan", url: "https://yuanbao.tencent.com/"},
                  {
                    name: "LingYi",
                    url: "https://platform.lingyiwanwu.com/playground",
                  },
                  {name: "Ai360", url: "https://chat.360.cn/chat"},
                  {
                    name: "OaiFree",
                    url: "https://shared.oaifree.com/dashboard",
                  },
                  {name: "XunFeiYun", url: "https://xinghuo.xfyun.cn/"},
                ]}
              />
              <LinkGroup
                title="Translation"
                links={[
                  {
                    name: "Google Translate",
                    url: "https://translate.google.com",
                  },
                  {
                    name: "Bing Translator",
                    url: "https://cn.bing.com/translator",
                  },
                  {name: "DeepL", url: "https://www.deepl.com/zh/translator"},
                  {
                    name: "Google Translate (ZH)",
                    url: "https://translate.google.com.hk/?hl=zh-CN&sl=auto&tl=en&op=translate",
                  },
                  {name: "Baidu Translate", url: "https://fanyi.baidu.com/"},
                  {
                    name: "Youdao Translate",
                    url: "https://fanyi.youdao.com/#/",
                  },
                ]}
              />
            </>
          )}
        </CardContent>
      </Card>
      {/*<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>*/}
      {/*  <DialogContent className="sm:max-w-md">*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle className="text-2xl font-semibold">验证码0</DialogTitle>*/}
      {/*    </DialogHeader>*/}
      {/*    <form*/}
      {/*      onSubmit={(e) => {*/}
      {/*        e.preventDefault();*/}
      {/*        handlePasswordSubmit();*/}
      {/*      }}*/}
      {/*      className="space-y-4"*/}
      {/*    >*/}
      {/*      <div className="flex flex-col space-y-4">*/}
      {/*        <Input*/}
      {/*          type="password"*/}
      {/*          value={password}*/}
      {/*          onChange={(e) => setPassword(e.target.value)}*/}
      {/*          placeholder="Verify Code"*/}
      {/*          className="h-10"*/}
      {/*        />*/}
      {/*        <Button type="submit" className="h-10">*/}
      {/*          <span className="text-base mr-2">确认</span>*/}
      {/*          <UnlockIcon className="h-4 w-4"/>*/}
      {/*        </Button>*/}
      {/*      </div>*/}
      {/*    </form>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}
      <PasswordDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        password={password}
        setPassword={setPassword}
        handlePasswordSubmit={handlePasswordSubmit}
      />
    </div>
  );
}
