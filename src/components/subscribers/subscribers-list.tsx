"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpDown,
  Check,
  Download,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Upload,
  UserPlus,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Subscriber {
  id: string;
  email: string;
  name: string;
  status: "active" | "unsubscribed" | "bounced";
  dateAdded: string;
  lastActivity: string;
  tags: string[];
}

export default function SubscribersList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const [showAddSubscriberDialog, setShowAddSubscriberDialog] = useState(false);
  const [newSubscriber, setNewSubscriber] = useState({
    email: "",
    name: "",
    tags: "",
  });

  // Sample subscribers data
  const subscribers: Subscriber[] = [
    {
      id: "1",
      email: "john.doe@example.com",
      name: "John Doe",
      status: "active",
      dateAdded: "2023-05-15",
      lastActivity: "2023-06-10",
      tags: ["customer", "newsletter"],
    },
    {
      id: "2",
      email: "jane.smith@example.com",
      name: "Jane Smith",
      status: "active",
      dateAdded: "2023-04-22",
      lastActivity: "2023-06-12",
      tags: ["prospect", "webinar"],
    },
    {
      id: "3",
      email: "michael.brown@example.com",
      name: "Michael Brown",
      status: "unsubscribed",
      dateAdded: "2023-03-10",
      lastActivity: "2023-05-01",
      tags: ["customer"],
    },
    {
      id: "4",
      email: "emily.wilson@example.com",
      name: "Emily Wilson",
      status: "active",
      dateAdded: "2023-06-01",
      lastActivity: "2023-06-15",
      tags: ["newsletter", "webinar"],
    },
    {
      id: "5",
      email: "david.johnson@example.com",
      name: "David Johnson",
      status: "bounced",
      dateAdded: "2023-02-18",
      lastActivity: "2023-04-05",
      tags: ["prospect"],
    },
    {
      id: "6",
      email: "sarah.miller@example.com",
      name: "Sarah Miller",
      status: "active",
      dateAdded: "2023-05-28",
      lastActivity: "2023-06-14",
      tags: ["customer", "newsletter", "webinar"],
    },
    {
      id: "7",
      email: "robert.taylor@example.com",
      name: "Robert Taylor",
      status: "active",
      dateAdded: "2023-04-15",
      lastActivity: "2023-06-08",
      tags: ["prospect"],
    },
    {
      id: "8",
      email: "jennifer.anderson@example.com",
      name: "Jennifer Anderson",
      status: "unsubscribed",
      dateAdded: "2023-03-22",
      lastActivity: "2023-05-10",
      tags: ["newsletter"],
    },
  ];

  const filteredSubscribers = subscribers.filter(
    (subscriber) =>
      subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectAll = () => {
    if (selectedSubscribers.length === filteredSubscribers.length) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(filteredSubscribers.map((sub) => sub.id));
    }
  };

  const handleSelectSubscriber = (id: string) => {
    if (selectedSubscribers.includes(id)) {
      setSelectedSubscribers(
        selectedSubscribers.filter((subId) => subId !== id),
      );
    } else {
      setSelectedSubscribers([...selectedSubscribers, id]);
    }
  };

  const handleAddSubscriber = () => {
    // In a real app, you would add the subscriber to your database
    console.log("Adding subscriber:", newSubscriber);
    setNewSubscriber({ email: "", name: "", tags: "" });
    setShowAddSubscriberDialog(false);
  };

  const getStatusColor = (status: Subscriber["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "unsubscribed":
        return "bg-gray-100 text-gray-800";
      case "bounced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Subscribers</h1>
          <p className="text-muted-foreground">
            Manage your email subscribers and segments
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog
            open={showAddSubscriberDialog}
            onOpenChange={setShowAddSubscriberDialog}
          >
            <DialogTrigger asChild>
              <Button className="gap-1">
                <UserPlus size={16} />
                Add Subscriber
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Subscriber</DialogTitle>
                <DialogDescription>
                  Add a new subscriber to your email list.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="email@example.com"
                    value={newSubscriber.email}
                    onChange={(e) =>
                      setNewSubscriber({
                        ...newSubscriber,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={newSubscriber.name}
                    onChange={(e) =>
                      setNewSubscriber({
                        ...newSubscriber,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    placeholder="newsletter, customer"
                    value={newSubscriber.tags}
                    onChange={(e) =>
                      setNewSubscriber({
                        ...newSubscriber,
                        tags: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowAddSubscriberDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddSubscriber}>Add Subscriber</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Upload size={16} />
                Import
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Import CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Import Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="gap-1">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>

      {/* Tabs and Filters */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Subscribers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="unsubscribed">Unsubscribed</TabsTrigger>
            <TabsTrigger value="bounced">Bounced</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subscribers..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={
                      selectedSubscribers.length ===
                        filteredSubscribers.length &&
                      filteredSubscribers.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                  <CardTitle className="text-base font-medium">
                    {selectedSubscribers.length > 0
                      ? `${selectedSubscribers.length} selected`
                      : "All Subscribers"}
                  </CardTitle>
                </div>
                {selectedSubscribers.length > 0 && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Plus size={14} />
                      Add Tag
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground px-6 py-3 border-y">
                <div className="col-span-1"></div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Name</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Date Added</div>
                <div className="col-span-1">Tags</div>
                <div className="col-span-1"></div>
              </div>

              {filteredSubscribers.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-muted-foreground">No subscribers found</p>
                </div>
              ) : (
                filteredSubscribers.map((subscriber) => (
                  <div
                    key={subscriber.id}
                    className="grid grid-cols-12 items-center px-6 py-4 border-b hover:bg-muted/50 transition-colors"
                  >
                    <div className="col-span-1">
                      <Checkbox
                        checked={selectedSubscribers.includes(subscriber.id)}
                        onCheckedChange={() =>
                          handleSelectSubscriber(subscriber.id)
                        }
                      />
                    </div>
                    <div className="col-span-3 font-medium">
                      {subscriber.email}
                    </div>
                    <div className="col-span-2">{subscriber.name}</div>
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          subscriber.status,
                        )}`}
                      >
                        {subscriber.status.charAt(0).toUpperCase() +
                          subscriber.status.slice(1)}
                      </span>
                    </div>
                    <div className="col-span-2">{subscriber.dateAdded}</div>
                    <div className="col-span-1">
                      {subscriber.tags.length > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted">
                          {subscriber.tags.length}
                        </span>
                      )}
                    </div>
                    <div className="col-span-1 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Subscriber</DropdownMenuItem>
                          <DropdownMenuItem>Manage Tags</DropdownMenuItem>
                          <Separator className="my-1" />
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <p>Active subscribers content</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unsubscribed" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <p>Unsubscribed content</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bounced" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <p>Bounced emails content</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
