import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Calendar,
  MapPin,
  Clock,
  CheckCheck,
  Check,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  type: "text" | "file" | "system";
  fileUrl?: string;
  fileName?: string;
}

interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    role: "job_seeker" | "recruiter";
    title?: string;
    company?: string;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  jobTitle?: string;
  applicationId?: string;
  createdAt: Date;
}

export default function MessageCenter() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock conversations data
  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      participants: [
        {
          id: "user1",
          name: "Sarah Johnson",
          avatar: "/placeholder.svg",
          role: "job_seeker",
          title: "Senior Frontend Developer",
        },
        {
          id: "user2",
          name: "Mike Chen",
          avatar: "/placeholder.svg",
          role: "recruiter",
          company: "TechCorp Solutions",
        },
      ],
      lastMessage: {
        id: "msg1",
        conversationId: "1",
        senderId: "user1",
        content:
          "Thank you for considering my application. I'm very excited about this opportunity!",
        timestamp: new Date("2024-01-15T14:30:00"),
        read: false,
        type: "text",
      },
      unreadCount: 2,
      jobTitle: "Senior Full Stack Developer",
      applicationId: "app1",
      createdAt: new Date("2024-01-15T10:00:00"),
    },
    {
      id: "2",
      participants: [
        {
          id: "user3",
          name: "Alex Rodriguez",
          avatar: "/placeholder.svg",
          role: "job_seeker",
          title: "UX Designer",
        },
        {
          id: "user2",
          name: "Mike Chen",
          avatar: "/placeholder.svg",
          role: "recruiter",
          company: "TechCorp Solutions",
        },
      ],
      lastMessage: {
        id: "msg2",
        conversationId: "2",
        senderId: "user2",
        content:
          "Hi Alex, I'd like to schedule a quick call to discuss your portfolio. Are you available this week?",
        timestamp: new Date("2024-01-14T16:45:00"),
        read: true,
        type: "text",
      },
      unreadCount: 0,
      jobTitle: "UX/UI Designer",
      applicationId: "app2",
      createdAt: new Date("2024-01-14T16:00:00"),
    },
  ]);

  // Mock messages data
  const [messages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "msg1",
        conversationId: "1",
        senderId: "user2",
        content:
          "Hi Sarah! I reviewed your application for the Senior Full Stack Developer position. Very impressive background!",
        timestamp: new Date("2024-01-15T10:00:00"),
        read: true,
        type: "text",
      },
      {
        id: "msg2",
        conversationId: "1",
        senderId: "user1",
        content:
          "Thank you so much! I'm really excited about the opportunity to work with TechCorp.",
        timestamp: new Date("2024-01-15T10:05:00"),
        read: true,
        type: "text",
      },
      {
        id: "msg3",
        conversationId: "1",
        senderId: "user2",
        content:
          "I'd love to schedule a technical interview with our team. Would next Tuesday at 2 PM work for you?",
        timestamp: new Date("2024-01-15T10:10:00"),
        read: true,
        type: "text",
      },
      {
        id: "msg4",
        conversationId: "1",
        senderId: "user1",
        content:
          "That works perfectly! Should I prepare anything specific for the interview?",
        timestamp: new Date("2024-01-15T14:15:00"),
        read: true,
        type: "text",
      },
      {
        id: "msg5",
        conversationId: "1",
        senderId: "user1",
        content:
          "Thank you for considering my application. I'm very excited about this opportunity!",
        timestamp: new Date("2024-01-15T14:30:00"),
        read: false,
        type: "text",
      },
    ],
    "2": [
      {
        id: "msg6",
        conversationId: "2",
        senderId: "user2",
        content:
          "Hi Alex, I'd like to schedule a quick call to discuss your portfolio. Are you available this week?",
        timestamp: new Date("2024-01-14T16:45:00"),
        read: true,
        type: "text",
      },
    ],
  });

  const currentConversation = conversations.find(
    (c) => c.id === selectedConversation,
  );
  const currentMessages = selectedConversation
    ? messages[selectedConversation] || []
    : [];
  const otherParticipant = currentConversation?.participants.find(
    (p) => p.id !== user?.id,
  );

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // In a real app, this would send the message via API
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const formatMessageTime = (timestamp: Date) => {
    const now = new Date();
    const messageDate = new Date(timestamp);

    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return messageDate.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getFilteredConversations = () => {
    if (!searchTerm) return conversations;

    return conversations.filter(
      (conv) =>
        conv.participants.some((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ) ||
        conv.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.lastMessage?.content
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[700px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Messages</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[580px]">
              <div className="space-y-1 p-3">
                {getFilteredConversations().map((conversation) => {
                  const otherUser = conversation.participants.find(
                    (p) => p.id !== user?.id,
                  );
                  const isSelected = selectedConversation === conversation.id;

                  return (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={otherUser?.avatar}
                            alt={otherUser?.name}
                          />
                          <AvatarFallback>
                            {otherUser?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm truncate">
                              {otherUser?.name}
                            </h4>
                            {conversation.unreadCount > 0 && (
                              <Badge
                                variant="default"
                                className="h-5 min-w-[20px] text-xs"
                              >
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {conversation.jobTitle}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {conversation.lastMessage?.content}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {conversation.lastMessage &&
                              formatMessageTime(
                                conversation.lastMessage.timestamp,
                              )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-3">
          {selectedConversation && currentConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={otherParticipant?.avatar}
                        alt={otherParticipant?.name}
                      />
                      <AvatarFallback>
                        {otherParticipant?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{otherParticipant?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {otherParticipant?.role === "recruiter"
                          ? `Recruiter at ${otherParticipant.company}`
                          : otherParticipant?.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Re: {currentConversation.jobTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-0">
                <ScrollArea className="h-[480px] p-4">
                  <div className="space-y-4">
                    {currentMessages.map((message) => {
                      const isOwn = message.senderId === user?.id;
                      const sender = currentConversation.participants.find(
                        (p) => p.id === message.senderId,
                      );

                      return (
                        <div
                          key={message.id}
                          className={`flex items-start gap-3 ${isOwn ? "flex-row-reverse" : ""}`}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={sender?.avatar}
                              alt={sender?.name}
                            />
                            <AvatarFallback className="text-xs">
                              {sender?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[70%]`}
                          >
                            <div
                              className={`px-4 py-2 rounded-2xl ${
                                isOwn
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {formatMessageTime(message.timestamp)}
                              </span>
                              {isOwn && (
                                <div className="flex items-center">
                                  {message.read ? (
                                    <CheckCheck className="h-3 w-3 text-blue-500" />
                                  ) : (
                                    <Check className="h-3 w-3 text-muted-foreground" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {isTyping && (
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={otherParticipant?.avatar}
                            alt={otherParticipant?.name}
                          />
                          <AvatarFallback className="text-xs">
                            {otherParticipant?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted px-4 py-2 rounded-2xl">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        className="pr-12"
                      />
                      <Button
                        size="sm"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            /* No Conversation Selected */
            <CardContent className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Send className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Select a conversation
                </h3>
                <p className="text-muted-foreground">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
