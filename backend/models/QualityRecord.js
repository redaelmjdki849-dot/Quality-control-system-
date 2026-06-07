// Quality Control Record Model - نموذج سجل جودة التحكم

const mongoose = require('mongoose');

const QualityRecordSchema = new mongoose.Schema({
  // معرّف فريد | Identifiant Unique | Unique ID
  recordId: {
    type: String,
    unique: true,
    required: true
  },
  
  // اسم المورد | Nom Fournisseur | Supplier Name
  nomFournisseur: {
    type: String,
    required: true
  },
  
  // رقم القطعة | Numéro de Pièce | Part Number
  partNumber: {
    type: String,
    required: true
  },
  
  // رقم الكرتون | Numéro de Carton | Carton Number
  numberCarton: {
    type: String,
    required: true
  },
  
  // رقم الدفعة | Numéro de Lot | Batch Number
  batchNumber: {
    type: String,
    required: true
  },
  
  // الموقع/الفرع | Site/Localisation | Site/Location
  site: {
    type: String,
    required: true
  },
  
  // القطع السليمة | Pièces OK | Good Pieces
  pcsOk: {
    type: Number,
    required: true,
    min: 0
  },
  
  // القطع المعيبة | Pièces NOK | Defective Pieces
  pcsNok: {
    type: Number,
    required: true,
    min: 0
  },
  
  // إجمالي القطع | Pièces Totales | Total Pieces
  pcsTotal: {
    type: Number,
    required: true,
    min: 0
  },
  
  // إجمالي المخزون | Stock Total | Total Stock
  totalStock: {
    type: Number,
    required: true,
    min: 0
  },
  
  // التاريخ | Date | Date
  date: {
    type: Date,
    default: Date.now
  },
  
  // شهر السنة | Mois/Année | Month/Year
  month: {
    type: String,
    required: true
  },
  
  // ملاحظات | Notes | Notes
  notes: {
    type: String,
    default: ''
  },
  
  // حالة التسجيل | Statut | Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('QualityRecord', QualityRecordSchema);