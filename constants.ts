import { BookMarked, ImageIcon, MessageSquare, ImagePlusIcon, Pen } from "lucide-react";

export const MAX_FREE_COUNTS = 15;

export const tools = [
  {
    label: '聊天对话',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: '中英互译',
    icon: BookMarked,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/translation',
  },
  {
    label: '文生成图',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: '写作助手',
    icon: Pen,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: '/writing',
  },
  {
    label: '人像照片修复',
    icon: ImagePlusIcon,
    color: "text-blue-700",
    bgcolor: "bg-blue-700/10",
    href: '/restorepics',
  },
  // {
  //   label: 'Music',
  //   icon: Music,
  //   href: '/music',
  //   color: "text-emerald-500",
  //   bgColor: "bg-emerald-500/10",
  // },
  // {
  //   label: '语音对话(开发中...)',
  //   icon: MessageSquarePlus,
  //   href: '/voicechat',
  //   color: "text-emerald-500",
  //   bgColor: "bg-emerald-500/10",
  // },
];
