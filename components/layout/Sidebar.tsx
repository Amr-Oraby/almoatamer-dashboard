"use client";

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Home, Users, X, Calendar, ChevronDown, LayoutTemplate, PieChart, PanelBottom, Plane, UserCheck, Newspaper, BookOpen, Tag, Ticket, Share2, ArrowRightLeft, HandCoins, Wallet, Flag, Bell, Languages, Map, Globe, MapPin, Shield, ShieldCheck, UserCog, Headset, Mail, Contact, MessageCircle, Search, Files, CircleHelp, FileText, FileKey, Info, Settings, Settings2, Clock, BarChart, HeartHandshake, Images, Lightbulb, Monitor, Rocket, UserCircle } from 'lucide-react';
import Image from 'next/image';
import { useSidebar } from '@/components/layout/SidebarContext';
import { useState, useEffect } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function Sidebar() {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();

  const [isUiManagementOpen, setIsUiManagementOpen] = useState(false);
  const [isDiscountsOpen, setIsDiscountsOpen] = useState(false);
  const [isPlacesOpen, setIsPlacesOpen] = useState(false);
  const [isRolesOpen, setIsRolesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPublicPagesOpen, setIsPublicPagesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Automatically open the collapsibles if a sub-page is active
  useEffect(() => {
    if (pathname.includes('/ui-management')) {
      setIsUiManagementOpen(true);
    }
    if (pathname.includes('/discounts')) {
      setIsDiscountsOpen(true);
    }
    if (pathname.includes('/places')) {
      setIsPlacesOpen(true);
    }
    if (pathname.includes('/roles')) {
      setIsRolesOpen(true);
    }
    if (pathname.includes('/contact')) {
      setIsContactOpen(true);
    }
    if (pathname.includes('/public-pages')) {
      setIsPublicPagesOpen(true);
    }
    if (pathname.includes('/settings')) {
      setIsSettingsOpen(true);
    }
  }, [pathname]);

  const navItems = [
    { href: '/', icon: Home, label: t('home') },
  ];

  const uiManagementItems = [
    { href: '/ui-management/thanking-word', icon: HeartHandshake, label: t('thanking_word') },
    { href: '/ui-management/gallery', icon: Images, label: t('gallery') },
    { href: '/ui-management/why-us', icon: Lightbulb, label: t('why_us') },
    { href: '/ui-management/main-section', icon: Monitor, label: t('main_section') },
    { href: '/ui-management/footer', icon: PanelBottom, label: t('footer') },
    { href: '/ui-management/how-to-start', icon: Rocket, label: t('how_to_start') },
    { href: '/ui-management/who-is-almuatamer', icon: UserCircle, label: t('who_is_almuatamer') },
    { href: '/ui-management/statistics', icon: PieChart, label: t('statistics') },
  ];

  const discountsItems = [
    { href: '/discounts/coupons', icon: Ticket, label: t('coupons_page') },
    { href: '/discounts/coupon-codes', icon: Tag, label: t('coupon-codes_page') },
  ];

  const additionalItems = [
    { href: '/clients/show-all', icon: Users, label: t('clients_page') },
    { href: '/umrahs/show-all', icon: Plane, label: t('umrahs_page') },
    { href: '/almoatamers', icon: UserCheck, label: t('almoatamers_page') },
    { href: '/news', icon: Newspaper, label: t('news_page') },
    { href: '/blogs', icon: BookOpen, label: t('blogs_page') },
  ];

  const bottomItems = [
    { href: '/referral-links', icon: Share2, label: t('referral_links_page') },
    { href: '/transactions', icon: ArrowRightLeft, label: t('transactions_page') },
    { href: '/withdrawal-requests', icon: HandCoins, label: t('withdrawal_requests_page') },
    { href: '/wallets', icon: Wallet, label: t('wallet_page') },
    { href: '/report-reason', icon: Flag, label: t('report_reason_page') },
    { href: '/notifications', icon: Bell, label: t('notifications_page') },
    { href: '/languages', icon: Languages, label: t('languages_page') },
  ];

  const placesItems = [
    { href: '/places/countries', icon: Globe, label: t('countries_page') },
    { href: '/places/cities', icon: MapPin, label: t('cities_page') },
  ];

  const rolesItems = [
    { href: '/roles', icon: ShieldCheck, label: t('roles_page') },
    { href: '/roles/admins', icon: UserCog, label: t('admins_page') },
  ];

  const contactItems = [
    { href: '/contact/messages', icon: Mail, label: t('contact_messages_page') },
    { href: '/contact/admin-contacts', icon: Contact, label: t('admin_contacts_page') },
    { href: '/contact/users-chats', icon: MessageCircle, label: t('users_chats') },
  ];

  const publicPagesItems = [
    { href: '/public-pages/faq', icon: CircleHelp, label: t('faq_page') },
    { href: '/public-pages/terms', icon: FileText, label: t('terms_page') },
    { href: '/public-pages/privacy', icon: FileKey, label: t('privacy_page') },
    { href: '/public-pages/about', icon: Info, label: t('about_page') },
  ];

  const lastItems = [
    { href: '/seo', icon: Search, label: t('seo_page') },
  ];

  const settingsItems = [
    { href: '/settings', icon: Settings2, label: t('settings_page') },
    { href: '/settings/reservation-times', icon: Clock, label: t('reservation_times_page') },
    { href: '/settings/financial-reports', icon: BarChart, label: t('financial_reports_page') },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed inset-y-0 start-0 z-50 w-64 bg-white dark:bg-zinc-950 border-e border-zinc-200 dark:border-zinc-800 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : 'max-md:-translate-x-full max-md:rtl:translate-x-full'
          }`}
      >
        <div className="p-6 flex flex-col items-center justify-center border-b border-zinc-200 dark:border-zinc-800 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 end-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="py-2">
            <Image
              src="/logo.svg"
              alt="Brand Logo"
              width={120}
              height={120}
              className="w-auto h-16 object-contain"
              priority
            />
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar [direction:rtl] rtl:[direction:ltr]">
          <ul className="space-y-2 px-4 [direction:ltr] rtl:[direction:rtl]">
            {navItems.map((item) => {
              // A more exact check for root path to avoid / matching everything
              const isExactlyActive = item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isExactlyActive
                      ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}

            {/* UI Management Dropdown */}
            <li>
              <Collapsible
                open={isUiManagementOpen}
                onOpenChange={setIsUiManagementOpen}
                className="w-full"
              >
                <CollapsibleTrigger className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors ${pathname.includes('/ui-management')
                  ? 'text-primary font-bold bg-primary/5'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}>
                  <div className="flex items-center gap-3">
                    <LayoutTemplate className="w-5 h-5" />
                    <span>{t('ui_management')}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUiManagementOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-1 pb-2">
                  {uiManagementItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-md transition-colors text-sm ${isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                          }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </li>

            {additionalItems.map((item) => {
              const isExactlyActive = item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isExactlyActive
                      ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}

            {/* Discounts Dropdown */}
            <li>
              <Collapsible
                open={isDiscountsOpen}
                onOpenChange={setIsDiscountsOpen}
                className="w-full"
              >
                <CollapsibleTrigger className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors ${pathname.includes('/discounts')
                  ? 'text-primary font-bold bg-primary/5'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}>
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5" />
                    <span>{t('discounts_menu')}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDiscountsOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-1 pb-2">
                  {discountsItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/discounts' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-md transition-colors text-sm ${isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                          }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </li>

            {bottomItems.map((item) => {
              const isExactlyActive = item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isExactlyActive
                      ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}

            {/* Places Dropdown */}
            <li>
              <Collapsible
                open={isPlacesOpen}
                onOpenChange={setIsPlacesOpen}
                className="w-full"
              >
                <CollapsibleTrigger className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors ${pathname.includes('/places')
                  ? 'text-primary font-bold bg-primary/5'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}>
                  <div className="flex items-center gap-3">
                    <Map className="w-5 h-5" />
                    <span>{t('places_menu')}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isPlacesOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-1 pb-2">
                  {placesItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/places' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-md transition-colors text-sm ${isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                          }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </li>

            {/* Roles Dropdown */}
            <li>
              <Collapsible
                open={isRolesOpen}
                onOpenChange={setIsRolesOpen}
                className="w-full"
              >
                <CollapsibleTrigger className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors ${pathname.includes('/roles')
                  ? 'text-primary font-bold bg-primary/5'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5" />
                    <span>{t('roles_menu')}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isRolesOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-1 pb-2">
                  {rolesItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/roles' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-md transition-colors text-sm ${isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                          }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </li>

            {lastItems.map((item) => {
              const isExactlyActive = item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isExactlyActive
                      ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}

            {/* Contact Dropdown */}
            <li>
              <Collapsible
                open={isContactOpen}
                onOpenChange={setIsContactOpen}
                className="w-full"
              >
                <CollapsibleTrigger className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors ${pathname.includes('/contact')
                  ? 'text-primary font-bold bg-primary/5'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}>
                  <div className="flex items-center gap-3">
                    <Headset className="w-5 h-5" />
                    <span>{t('contact_menu')}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isContactOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-1 pb-2">
                  {contactItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/contact' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-md transition-colors text-sm ${isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                          }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </li>

            {/* Public Pages Dropdown */}
            <li>
              <Collapsible
                open={isPublicPagesOpen}
                onOpenChange={setIsPublicPagesOpen}
                className="w-full"
              >
                <CollapsibleTrigger className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors ${pathname.includes('/public-pages')
                  ? 'text-primary font-bold bg-primary/5'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}>
                  <div className="flex items-center gap-3">
                    <Files className="w-5 h-5" />
                    <span>{t('public_pages_menu')}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isPublicPagesOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-1 pb-2">
                  {publicPagesItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/public-pages' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-md transition-colors text-sm ${isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                          }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </li>

            {/* Settings Dropdown */}
            <li>
              <Collapsible
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}
                className="w-full"
              >
                <CollapsibleTrigger className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors ${pathname.includes('/settings')
                  ? 'text-primary font-bold bg-primary/5'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}>
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5" />
                    <span>{t('settings_menu')}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSettingsOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-1 pb-2">
                  {settingsItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/settings' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-md transition-colors text-sm ${isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                          }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
