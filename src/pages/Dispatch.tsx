import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Truck,
  Calendar,
  User,
  MapPin,
  FileText,
  Check,
  Clock,
  AlertCircle,
  Package,
  Download,
} from 'lucide-react';
import { MaterialDispatch, DispatchItem } from '@/types/inventory';

const Dispatch: React.FC = () => {
  const [isNewDispatchDialogOpen, setIsNewDispatchDialogOpen] = useState(false);
  const [newDispatch, setNewDispatch] = useState<Partial<MaterialDispatch>>({
    manifestNumber: '',
    destination: '',
    requestedBy: '',
    dateRequested: '',
    status: 'pending',
    items: [],
    notes: '',
    totalValue: 0,
  });

  const [newDispatchItem, setNewDispatchItem] = useState<Partial<DispatchItem>>({
    itemName: '',
    quantityRequested: 0,
    quantityDispatched: 0,
    serialNumbers: [],
    condition: 'good',
    notes: '',
  });

  // Mock data
  const [dispatchRecords] = useState<MaterialDispatch[]>([
    {
      id: '1',
      manifestNumber: 'MAN-2024-001',
      destination: 'Kampala Regional Office',
      requestedBy: 'Sarah Johnson',
      dateRequested: '2024-01-18',
      dateDispatched: '2024-01-20',
      dispatchedBy: 'Michael Brown',
      status: 'dispatched',
      items: [
        {
          id: '1',
          itemId: '1',
          itemName: 'Dell Laptop Inspiron 15',
          quantityRequested: 5,
          quantityDispatched: 5,
          serialNumbers: ['DL-2024-001', 'DL-2024-002', 'DL-2024-003', 'DL-2024-004', 'DL-2024-005'],
          condition: 'new',
          notes: 'All units tested and configured',
        },
      ],
      notes: 'Urgent delivery for new office setup',
      totalValue: 4250,
    },
    {
      id: '2',
      manifestNumber: 'MAN-2024-002',
      destination: 'Entebbe Medical Center',
      requestedBy: 'Dr. David Wilson',
      dateRequested: '2024-01-22',
      status: 'pending',
      items: [
        {
          id: '2',
          itemId: '3',
          itemName: 'Digital Stethoscope',
          quantityRequested: 3,
          quantityDispatched: 0,
          serialNumbers: [],
          condition: 'new',
        },
      ],
      notes: 'Medical equipment for cardiac unit',
      totalValue: 600,
    },
    {
      id: '3',
      manifestNumber: 'MAN-2024-003',
      destination: 'Mbarara District Office',
      requestedBy: 'Grace Nakato',
      dateRequested: '2024-01-23',
      status: 'approved',
      items: [
        {
          id: '3',
          itemId: '2',
          itemName: 'Office Chair Ergonomic',
          quantityRequested: 10,
          quantityDispatched: 0,
          serialNumbers: [],
          condition: 'good',
        },
      ],
      notes: 'Office furniture for new employees',
      totalValue: 1200,
    },
  ]);

  const addItemToDispatch = () => {
    if (newDispatchItem.itemName && newDispatchItem.quantityRequested) {
      const item: DispatchItem = {
        id: Date.now().toString(),
        itemId: Date.now().toString(),
        itemName: newDispatchItem.itemName!,
        quantityRequested: newDispatchItem.quantityRequested!,
        quantityDispatched: newDispatchItem.quantityDispatched || 0,
        serialNumbers: newDispatchItem.serialNumbers || [],
        condition: newDispatchItem.condition || 'good',
        notes: newDispatchItem.notes,
      };

      setNewDispatch(prev => ({
        ...prev,
        items: [...(prev.items || []), item],
      }));

      setNewDispatchItem({
        itemName: '',
        quantityRequested: 0,
        quantityDispatched: 0,
        serialNumbers: [],
        condition: 'good',
        notes: '',
      });
    }
  };

  const handleCreateDispatch = () => {
    // In real app, this would call an API
    console.log('Creating dispatch:', newDispatch);
    setIsNewDispatchDialogOpen(false);
    setNewDispatch({
      manifestNumber: '',
      destination: '',
      requestedBy: '',
      dateRequested: '',
      status: 'pending',
      items: [],
      notes: '',
      totalValue: 0,
    });
  };

  const generateManifestNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `MAN-${year}-${month}${day}-${random}`;
  };

  const getStatusBadge = (status: MaterialDispatch['status']) => {
    switch (status) {
      case 'pending':
        return { variant: 'secondary' as const, icon: Clock, label: 'Pending' };
      case 'approved':
        return { variant: 'default' as const, icon: Check, label: 'Approved' };
      case 'dispatched':
        return { variant: 'default' as const, icon: Truck, label: 'Dispatched' };
      case 'delivered':
        return { variant: 'default' as const, icon: Package, label: 'Delivered' };
      default:
        return { variant: 'secondary' as const, icon: AlertCircle, label: 'Unknown' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Material Dispatch</h1>
          <p className="text-muted-foreground">
            Create and manage outgoing material dispatch requests
          </p>
        </div>
        
        <Dialog open={isNewDispatchDialogOpen} onOpenChange={setIsNewDispatchDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:bg-primary-hover shadow-soft">
              <Plus className="h-4 w-4 mr-2" />
              New Dispatch
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Dispatch Manifest</DialogTitle>
              <DialogDescription>
                Create a new dispatch request for outgoing materials
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Dispatch Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manifestNumber">Manifest Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="manifestNumber"
                      value={newDispatch.manifestNumber}
                      onChange={(e) => setNewDispatch({...newDispatch, manifestNumber: e.target.value})}
                      placeholder="e.g., MAN-2024-003"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => setNewDispatch({...newDispatch, manifestNumber: generateManifestNumber()})}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={newDispatch.destination}
                    onChange={(e) => setNewDispatch({...newDispatch, destination: e.target.value})}
                    placeholder="Enter destination address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requestedBy">Requested By</Label>
                  <Input
                    id="requestedBy"
                    value={newDispatch.requestedBy}
                    onChange={(e) => setNewDispatch({...newDispatch, requestedBy: e.target.value})}
                    placeholder="Enter requester name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateRequested">Date Requested</Label>
                  <Input
                    id="dateRequested"
                    type="date"
                    value={newDispatch.dateRequested}
                    onChange={(e) => setNewDispatch({...newDispatch, dateRequested: e.target.value})}
                  />
                </div>
              </div>

              {/* Add Items Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Items to Dispatch</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="itemName">Item Name</Label>
                      <Input
                        id="itemName"
                        value={newDispatchItem.itemName}
                        onChange={(e) => setNewDispatchItem({...newDispatchItem, itemName: e.target.value})}
                        placeholder="Enter item name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantityRequested">Quantity Requested</Label>
                      <Input
                        id="quantityRequested"
                        type="number"
                        value={newDispatchItem.quantityRequested}
                        onChange={(e) => setNewDispatchItem({...newDispatchItem, quantityRequested: Number(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select value={newDispatchItem.condition} onValueChange={(value) => setNewDispatchItem({...newDispatchItem, condition: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3 space-y-2">
                      <Label htmlFor="itemNotes">Item Notes</Label>
                      <Input
                        id="itemNotes"
                        value={newDispatchItem.notes}
                        onChange={(e) => setNewDispatchItem({...newDispatchItem, notes: e.target.value})}
                        placeholder="Any special requirements or notes"
                      />
                    </div>
                  </div>
                  <Button onClick={addItemToDispatch} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </CardContent>
              </Card>

              {/* Items List */}
              {newDispatch.items && newDispatch.items.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Items in Dispatch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item Name</TableHead>
                          <TableHead>Quantity Requested</TableHead>
                          <TableHead>Condition</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {newDispatch.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.itemName}</TableCell>
                            <TableCell>{item.quantityRequested}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.condition}</Badge>
                            </TableCell>
                            <TableCell>{item.notes || 'N/A'}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" className="text-destructive">
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

              {/* Dispatch Notes */}
              <div className="space-y-2">
                <Label htmlFor="dispatchNotes">Dispatch Notes</Label>
                <Textarea
                  id="dispatchNotes"
                  value={newDispatch.notes}
                  onChange={(e) => setNewDispatch({...newDispatch, notes: e.target.value})}
                  placeholder="Any additional notes about this dispatch"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsNewDispatchDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateDispatch} className="bg-gradient-primary hover:bg-primary-hover">
                Create Dispatch
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dispatch Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Dispatch Manifests
          </CardTitle>
          <CardDescription>
            Track all outgoing material dispatch requests and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Manifest Details</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Date Requested</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dispatchRecords.map((record) => {
                const statusInfo = getStatusBadge(record.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <TableRow key={record.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{record.manifestNumber}</p>
                        {record.notes && (
                          <p className="text-sm text-muted-foreground">{record.notes}</p>
                        )}
                        {record.dateDispatched && (
                          <p className="text-xs text-success">
                            Dispatched: {new Date(record.dateDispatched).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {record.destination}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {record.requestedBy}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(record.dateRequested).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        {record.items.length} items
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusInfo.variant} className="flex items-center gap-1 w-fit">
                        <StatusIcon className="h-3 w-3" />
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dispatch;