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
  PackageCheck,
  Calendar,
  User,
  Building,
  Scan,
  Check,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { MaterialReceiving, ReceivingItem } from '@/types/inventory';

const Receiving: React.FC = () => {
  const [isNewReceiptDialogOpen, setIsNewReceiptDialogOpen] = useState(false);
  const [newReceipt, setNewReceipt] = useState<Partial<MaterialReceiving>>({
    receiptNumber: '',
    supplier: '',
    dateReceived: '',
    receivedBy: '',
    status: 'pending',
    items: [],
    notes: '',
    totalValue: 0,
  });

  const [newReceivingItem, setNewReceivingItem] = useState<Partial<ReceivingItem>>({
    itemName: '',
    serialNumber: '',
    barcode: '',
    quantityExpected: 0,
    quantityReceived: 0,
    unitPrice: 0,
    condition: 'new',
    notes: '',
  });

  // Mock data
  const [receivingRecords] = useState<MaterialReceiving[]>([
    {
      id: '1',
      receiptNumber: 'RCP-2024-001',
      supplier: 'Dell Technologies',
      dateReceived: '2024-01-20',
      receivedBy: 'John Doe',
      status: 'received',
      items: [
        {
          id: '1',
          itemName: 'Dell Laptop Inspiron 15',
          serialNumber: 'DL-2024-001',
          barcode: '1234567890123',
          quantityExpected: 10,
          quantityReceived: 10,
          unitPrice: 850,
          condition: 'new',
          notes: 'All items in perfect condition',
        },
      ],
      notes: 'Delivery completed on time',
      totalValue: 8500,
    },
    {
      id: '2',
      receiptNumber: 'RCP-2024-002',
      supplier: 'MedTech Supply',
      dateReceived: '2024-01-22',
      receivedBy: 'Jane Smith',
      status: 'pending',
      items: [
        {
          id: '2',
          itemName: 'Digital Stethoscope',
          serialNumber: 'DS-2024-002',
          quantityExpected: 5,
          quantityReceived: 0,
          unitPrice: 200,
          condition: 'new',
        },
      ],
      notes: 'Awaiting delivery confirmation',
      totalValue: 1000,
    },
  ]);

  const addItemToReceipt = () => {
    if (newReceivingItem.itemName && newReceivingItem.quantityExpected) {
      const item: ReceivingItem = {
        id: Date.now().toString(),
        itemName: newReceivingItem.itemName!,
        serialNumber: newReceivingItem.serialNumber,
        barcode: newReceivingItem.barcode,
        quantityExpected: newReceivingItem.quantityExpected!,
        quantityReceived: newReceivingItem.quantityReceived || 0,
        unitPrice: newReceivingItem.unitPrice || 0,
        condition: newReceivingItem.condition || 'new',
        notes: newReceivingItem.notes,
      };

      setNewReceipt(prev => ({
        ...prev,
        items: [...(prev.items || []), item],
        totalValue: (prev.totalValue || 0) + (item.quantityExpected * item.unitPrice),
      }));

      setNewReceivingItem({
        itemName: '',
        serialNumber: '',
        barcode: '',
        quantityExpected: 0,
        quantityReceived: 0,
        unitPrice: 0,
        condition: 'new',
        notes: '',
      });
    }
  };

  const handleCreateReceipt = () => {
    // In real app, this would call an API
    console.log('Creating receipt:', newReceipt);
    setIsNewReceiptDialogOpen(false);
    setNewReceipt({
      receiptNumber: '',
      supplier: '',
      dateReceived: '',
      receivedBy: '',
      status: 'pending',
      items: [],
      notes: '',
      totalValue: 0,
    });
  };

  const getStatusBadge = (status: MaterialReceiving['status']) => {
    switch (status) {
      case 'pending':
        return { variant: 'secondary' as const, icon: Clock, label: 'Pending' };
      case 'received':
        return { variant: 'default' as const, icon: Check, label: 'Received' };
      case 'verified':
        return { variant: 'default' as const, icon: PackageCheck, label: 'Verified' };
      default:
        return { variant: 'secondary' as const, icon: AlertCircle, label: 'Unknown' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Material Receiving</h1>
          <p className="text-muted-foreground">
            Log and track incoming materials and inventory
          </p>
        </div>
        
        <Dialog open={isNewReceiptDialogOpen} onOpenChange={setIsNewReceiptDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:bg-primary-hover shadow-soft">
              <Plus className="h-4 w-4 mr-2" />
              New Receipt
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Material Receipt</DialogTitle>
              <DialogDescription>
                Record incoming materials and their details
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Receipt Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="receiptNumber">Receipt Number</Label>
                  <Input
                    id="receiptNumber"
                    value={newReceipt.receiptNumber}
                    onChange={(e) => setNewReceipt({...newReceipt, receiptNumber: e.target.value})}
                    placeholder="e.g., RCP-2024-003"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={newReceipt.supplier}
                    onChange={(e) => setNewReceipt({...newReceipt, supplier: e.target.value})}
                    placeholder="Enter supplier name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateReceived">Date Received</Label>
                  <Input
                    id="dateReceived"
                    type="date"
                    value={newReceipt.dateReceived}
                    onChange={(e) => setNewReceipt({...newReceipt, dateReceived: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receivedBy">Received By</Label>
                  <Input
                    id="receivedBy"
                    value={newReceipt.receivedBy}
                    onChange={(e) => setNewReceipt({...newReceipt, receivedBy: e.target.value})}
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Add Items Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Items to Receipt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="itemName">Item Name</Label>
                      <Input
                        id="itemName"
                        value={newReceivingItem.itemName}
                        onChange={(e) => setNewReceivingItem({...newReceivingItem, itemName: e.target.value})}
                        placeholder="Enter item name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serialNumber">Serial Number</Label>
                      <div className="flex gap-2">
                        <Input
                          id="serialNumber"
                          value={newReceivingItem.serialNumber}
                          onChange={(e) => setNewReceivingItem({...newReceivingItem, serialNumber: e.target.value})}
                          placeholder="Serial number"
                        />
                        <Button variant="outline" size="icon">
                          <Scan className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="barcode">Barcode</Label>
                      <div className="flex gap-2">
                        <Input
                          id="barcode"
                          value={newReceivingItem.barcode}
                          onChange={(e) => setNewReceivingItem({...newReceivingItem, barcode: e.target.value})}
                          placeholder="Barcode"
                        />
                        <Button variant="outline" size="icon">
                          <Scan className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantityExpected">Expected Qty</Label>
                      <Input
                        id="quantityExpected"
                        type="number"
                        value={newReceivingItem.quantityExpected}
                        onChange={(e) => setNewReceivingItem({...newReceivingItem, quantityExpected: Number(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantityReceived">Received Qty</Label>
                      <Input
                        id="quantityReceived"
                        type="number"
                        value={newReceivingItem.quantityReceived}
                        onChange={(e) => setNewReceivingItem({...newReceivingItem, quantityReceived: Number(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unitPrice">Unit Price ($)</Label>
                      <Input
                        id="unitPrice"
                        type="number"
                        step="0.01"
                        value={newReceivingItem.unitPrice}
                        onChange={(e) => setNewReceivingItem({...newReceivingItem, unitPrice: Number(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select value={newReceivingItem.condition} onValueChange={(value) => setNewReceivingItem({...newReceivingItem, condition: value})}>
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
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="itemNotes">Item Notes</Label>
                      <Input
                        id="itemNotes"
                        value={newReceivingItem.notes}
                        onChange={(e) => setNewReceivingItem({...newReceivingItem, notes: e.target.value})}
                        placeholder="Any notes about this item"
                      />
                    </div>
                  </div>
                  <Button onClick={addItemToReceipt} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </CardContent>
              </Card>

              {/* Items List */}
              {newReceipt.items && newReceipt.items.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Items in Receipt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item Name</TableHead>
                          <TableHead>Serial/Barcode</TableHead>
                          <TableHead>Expected</TableHead>
                          <TableHead>Received</TableHead>
                          <TableHead>Unit Price</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {newReceipt.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.itemName}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <p>S/N: {item.serialNumber || 'N/A'}</p>
                                <p>BC: {item.barcode || 'N/A'}</p>
                              </div>
                            </TableCell>
                            <TableCell>{item.quantityExpected}</TableCell>
                            <TableCell>{item.quantityReceived}</TableCell>
                            <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                            <TableCell>${(item.quantityExpected * item.unitPrice).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-4 text-right">
                      <p className="text-lg font-semibold">
                        Total Value: ${newReceipt.totalValue?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Receipt Notes */}
              <div className="space-y-2">
                <Label htmlFor="receiptNotes">Receipt Notes</Label>
                <Textarea
                  id="receiptNotes"
                  value={newReceipt.notes}
                  onChange={(e) => setNewReceipt({...newReceipt, notes: e.target.value})}
                  placeholder="Any additional notes about this receipt"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsNewReceiptDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateReceipt} className="bg-gradient-primary hover:bg-primary-hover">
                Create Receipt
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Receiving Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PackageCheck className="h-5 w-5 text-primary" />
            Recent Material Receipts
          </CardTitle>
          <CardDescription>
            Track all incoming materials and their verification status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt Details</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date Received</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receivingRecords.map((record) => {
                const statusInfo = getStatusBadge(record.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <TableRow key={record.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{record.receiptNumber}</p>
                        {record.notes && (
                          <p className="text-sm text-muted-foreground">{record.notes}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        {record.supplier}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(record.dateReceived).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{record.items.length} items</TableCell>
                    <TableCell>${record.totalValue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={statusInfo.variant} className="flex items-center gap-1 w-fit">
                        <StatusIcon className="h-3 w-3" />
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {record.receivedBy}
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

export default Receiving;