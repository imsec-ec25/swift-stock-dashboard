export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: string;
  serialNumber?: string;
  barcode?: string;
  quantity: number;
  minStockLevel: number;
  unitPrice: number;
  totalValue: number;
  location: string;
  supplier: string;
  dateAdded: string;
  lastUpdated: string;
  status: 'active' | 'inactive' | 'damaged';
  condition: 'new' | 'good' | 'fair' | 'poor';
}

export interface MaterialReceiving {
  id: string;
  receiptNumber: string;
  supplier: string;
  dateReceived: string;
  receivedBy: string;
  status: 'pending' | 'received' | 'verified';
  items: ReceivingItem[];
  notes?: string;
  totalValue: number;
}

export interface ReceivingItem {
  id: string;
  itemName: string;
  serialNumber?: string;
  barcode?: string;
  quantityExpected: number;
  quantityReceived: number;
  unitPrice: number;
  condition: string;
  notes?: string;
}

export interface MaterialDispatch {
  id: string;
  manifestNumber: string;
  destination: string;
  requestedBy: string;
  dateRequested: string;
  dateDispatched?: string;
  dispatchedBy?: string;
  status: 'pending' | 'approved' | 'dispatched' | 'delivered';
  items: DispatchItem[];
  notes?: string;
  totalValue: number;
}

export interface DispatchItem {
  id: string;
  itemId: string;
  itemName: string;
  quantityRequested: number;
  quantityDispatched: number;
  serialNumbers: string[];
  condition: string;
  notes?: string;
}