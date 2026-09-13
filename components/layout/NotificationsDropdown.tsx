"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useInfiniteNotifications } from "@/features/notifications/hooks";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(5);
  const tDashboard = useTranslations("Dashboard");
  const tCommon = useTranslations("Common");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteNotifications();

  const allNotifications = data?.pages.flatMap((p) => p.data) || [];
  const displayedNotifications = allNotifications.slice(0, displayCount);
  const unreadCount = data?.pages[0]?.unread_count || 0;

  const handleLoadMore = () => {
    const nextCount = displayCount + 5;
    setDisplayCount(nextCount);
    // If we are showing all currently fetched notifications and there are more pages, fetch the next page
    if (nextCount > allNotifications.length && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="relative text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors outline-none cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 end-1.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80 md:w-96 p-0 rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800">
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-between items-center">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{tDashboard("notifications_page", { fallback: "Notifications" })}</h3>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
             <div className="p-6 text-center text-sm font-medium text-zinc-500">{tCommon("loading", { fallback: "Loading..." })}</div>
          ) : displayedNotifications.length === 0 ? (
             <div className="p-6 text-center text-sm font-medium text-zinc-500">{tCommon("no_results")}</div>
          ) : (
             <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
                {displayedNotifications.map((notif) => (
                   <div key={notif.id} className={`p-4 flex gap-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50 ${!notif.is_readed ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden border border-primary/20">
                          {notif.image ? <img src={notif.image} className="w-full h-full object-cover" alt="" /> : <Bell className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{notif.title}</p>
                         <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{notif.body}</p>
                         <p className="text-[11px] text-zinc-400 mt-2 font-medium">
                           {notif.sending_time_ago}
                         </p>
                      </div>
                   </div>
                ))}
             </div>
          )}
        </div>
        
        {(allNotifications.length > displayCount || hasNextPage) && (
          <div className="p-2 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30">
             <Button variant="ghost" className="w-full text-xs font-bold text-primary hover:text-primary hover:bg-primary/10" onClick={(e) => {
                 e.preventDefault();
                 handleLoadMore();
             }} disabled={isFetchingNextPage}>
                 {isFetchingNextPage ? tCommon("loading", { fallback: "Loading..." }) : `+ ${tCommon("load_more", { fallback: "Load More" })}`}
             </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
