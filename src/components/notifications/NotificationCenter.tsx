import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BellIcon,
  CheckIcon,
  BriefcaseIcon,
  MessageSquareIcon,
  CalendarIcon,
  UserIcon,
  StarIcon,
  AlertCircleIcon,
  ExternalLinkIcon,
  TrashIcon,
  SettingsIcon,
  MarkAsUnreadIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface Notification {
  id: string;
  type:
    | "job_match"
    | "application_update"
    | "interview"
    | "message"
    | "achievement"
    | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  metadata?: {
    jobId?: string;
    companyName?: string;
    interviewDate?: Date;
    messageFrom?: string;
    achievementType?: string;
  };
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<
    | "all"
    | "unread"
    | "job_match"
    | "application_update"
    | "interview"
    | "message"
  >("all");

  // Load notifications from localStorage and simulate real-time updates
  useEffect(() => {
    const loadNotifications = () => {
      const saved = localStorage.getItem("notifications");
      if (saved) {
        const parsed = JSON.parse(saved).map((notif: any) => ({
          ...notif,
          createdAt: new Date(notif.createdAt),
          metadata: {
            ...notif.metadata,
            interviewDate: notif.metadata?.interviewDate
              ? new Date(notif.metadata.interviewDate)
              : undefined,
          },
        }));
        setNotifications(parsed);
      } else {
        // Generate some sample notifications
        const sampleNotifications: Notification[] = [
          {
            id: "1",
            type: "job_match",
            title: "New Job Match Found!",
            message:
              "We found a Senior Developer position at TechCorp that matches your profile.",
            read: false,
            createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
            actionUrl: "/jobs/123",
            metadata: {
              jobId: "123",
              companyName: "TechCorp Solutions",
            },
          },
          {
            id: "2",
            type: "application_update",
            title: "Application Status Update",
            message:
              "Your application for UX Designer at InnovateInc has been reviewed.",
            read: false,
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            actionUrl: "/applications/456",
            metadata: {
              jobId: "456",
              companyName: "InnovateInc",
            },
          },
          {
            id: "3",
            type: "interview",
            title: "Interview Scheduled",
            message:
              "You have an interview scheduled for tomorrow at 2:00 PM with DataFlow Systems.",
            read: true,
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
            actionUrl: "/interviews/789",
            metadata: {
              companyName: "DataFlow Systems",
              interviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
            },
          },
          {
            id: "4",
            type: "message",
            title: "New Message",
            message:
              "You have a new message from Sarah at TechCorp about the Senior Developer position.",
            read: true,
            createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
            actionUrl: "/messages/conversation-123",
            metadata: {
              messageFrom: "Sarah Johnson",
              companyName: "TechCorp",
            },
          },
          {
            id: "5",
            type: "achievement",
            title: "Profile Milestone!",
            message:
              "Congratulations! Your profile has been viewed 100+ times this month.",
            read: true,
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            metadata: {
              achievementType: "profile_views",
            },
          },
        ];
        setNotifications(sampleNotifications);
        localStorage.setItem(
          "notifications",
          JSON.stringify(sampleNotifications),
        );
      }
    };

    loadNotifications();

    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        // 10% chance every 30 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: Math.random() > 0.5 ? "job_match" : "application_update",
          title: Math.random() > 0.5 ? "New Job Match!" : "Application Update",
          message:
            Math.random() > 0.5
              ? "A new job that matches your skills has been posted."
              : "There's an update on one of your applications.",
          read: false,
          createdAt: new Date(),
          actionUrl: "/jobs",
        };

        setNotifications((prev) => {
          const updated = [newNotification, ...prev];
          localStorage.setItem("notifications", JSON.stringify(updated));
          return updated;
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n,
      );
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const markAsUnread = (notificationId: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) =>
        n.id === notificationId ? { ...n, read: false } : n,
      );
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== notificationId);
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "job_match":
        return <BriefcaseIcon className="h-4 w-4" />;
      case "application_update":
        return <UserIcon className="h-4 w-4" />;
      case "interview":
        return <CalendarIcon className="h-4 w-4" />;
      case "message":
        return <MessageSquareIcon className="h-4 w-4" />;
      case "achievement":
        return <StarIcon className="h-4 w-4" />;
      case "system":
        return <AlertCircleIcon className="h-4 w-4" />;
      default:
        return <BellIcon className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "job_match":
        return "text-blue-600 bg-blue-50";
      case "application_update":
        return "text-green-600 bg-green-50";
      case "interview":
        return "text-purple-600 bg-purple-50";
      case "message":
        return "text-orange-600 bg-orange-50";
      case "achievement":
        return "text-yellow-600 bg-yellow-50";
      case "system":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <SettingsIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilter("all")}>
                  All notifications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("unread")}>
                  Unread only
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter("job_match")}>
                  Job matches
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter("application_update")}
                >
                  Application updates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("interview")}>
                  Interviews
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("message")}>
                  Messages
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={clearAllNotifications}
                  className="text-red-600"
                >
                  Clear all
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {filteredNotifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <BellIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-1">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 hover:bg-muted cursor-pointer transition-colors ${
                    !notification.read ? "bg-blue-50 dark:bg-blue-950/20" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-1 rounded-full ${getNotificationColor(notification.type)}`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-sm font-medium ${!notification.read ? "font-semibold" : ""}`}
                        >
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(notification.createdAt)} ago
                        </span>
                        <div className="flex items-center gap-1">
                          {notification.actionUrl && (
                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                            >
                              <Link
                                to={notification.actionUrl}
                                onClick={() => {
                                  markAsRead(notification.id);
                                  setIsOpen(false);
                                }}
                              >
                                <ExternalLinkIcon className="h-3 w-3" />
                              </Link>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() =>
                              notification.read
                                ? markAsUnread(notification.id)
                                : markAsRead(notification.id)
                            }
                          >
                            {notification.read ? (
                              <MarkAsUnreadIcon className="h-3 w-3" />
                            ) : (
                              <CheckIcon className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-600"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <TrashIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="ghost" className="w-full text-xs" asChild>
                <Link to="/notifications" onClick={() => setIsOpen(false)}>
                  View all notifications
                </Link>
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Full page notification center
export default function NotificationPage() {
  // This would be similar to the dropdown but as a full page
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellIcon className="h-6 w-6" />
            Notification Center
          </CardTitle>
          <CardDescription>
            Stay updated with your job search activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This would be the full notification center page with more detailed
            view, filtering options, and bulk actions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
