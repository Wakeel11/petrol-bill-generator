/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Fuel, 
  MapPin, 
  Calendar, 
  Hash, 
  Droplets, 
  Car, 
  IndianRupee, 
  Download, 
  Printer, 
  Info, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  FileText,
  ShieldCheck,
  Mail,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore - html2pdf.js doesn't have types but we can use it
import html2pdf from 'html2pdf.js';

// --- Types ---
type FuelType = 'Petrol' | 'Diesel' | 'Power' | 'CNG';
type LayoutType = 'Thermal' | 'Invoice';

interface BillData {
  pumpName: string;
  address: string;
  dateTime: string;
  receiptNo: string;
  fuelType: FuelType;
  vehicleNo: string;
  rate: number;
  totalAmount: number;
  liters: number;
}

// --- Constants ---
const OIL_COMPANIES = [
  { name: 'IOCL', fullName: 'Indian Oil Corporation Ltd', color: 'bg-orange-600', description: 'The largest commercial oil company in India.' },
  { name: 'BPCL', fullName: 'Bharat Petroleum Corporation Ltd', color: 'bg-blue-700', description: 'A Fortune 500 oil refining and marketing company.' },
  { name: 'HPCL', fullName: 'Hindustan Petroleum Corporation Ltd', color: 'bg-red-700', description: 'A Maharatna CPSE with a strong presence in the energy sector.' },
  { name: 'Shell', fullName: 'Shell India', color: 'bg-yellow-500', description: 'A global group of energy and petrochemical companies.' },
];

const FAQS = [
  { question: "Is FuelTrace India free to use?", answer: "Yes, FuelTrace India is a completely free online petrol bill generator for generating personal fuel records and receipts." },
  { question: "How to generate petrol bills online?", answer: "To generate petrol bills online, simply fill in the pump details, vehicle number, and amount in our petrol bill generator online tool and click download." },
  { question: "Can I use these receipts for official tax records?", answer: "These receipts are for educational and personal record-keeping purposes. For official tax claims, please use original receipts provided by the fuel station to avoid petrol pump computer generated bill cheating india issues." },
  { question: "Is my data stored on your servers?", answer: "No. All data processing happens locally in your browser. We do not store any information you enter in our database, making it a secure petrol pump bill generator." },
  { question: "How do I download the bill as PDF?", answer: "Once you fill in the details, click on the 'Download PDF' button. You can choose between Thermal and Invoice layouts for your petrol pump computer generated bill." },
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Fuel className="text-indigo-400 w-8 h-8" />
            <div>
              <span className="text-xl font-bold tracking-tight">FuelTrace <span className="text-indigo-400">India</span></span>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Precision in Every Receipt</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#generator" className="hover:text-indigo-400 transition-colors">Generator</a>
            <a href="#directory" className="hover:text-indigo-400 transition-colors">Directory</a>
            <a href="#how-to-use" className="hover:text-indigo-400 transition-colors">How to Use</a>
            <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800 border-t border-slate-700 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#generator" onClick={() => setIsOpen(false)} className="block hover:text-indigo-400">Generator</a>
              <a href="#directory" onClick={() => setIsOpen(false)} className="block hover:text-indigo-400">Directory</a>
              <a href="#how-to-use" onClick={() => setIsOpen(false)} className="block hover:text-indigo-400">How to Use</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="block hover:text-indigo-400">Contact</a>
              <a href="#faq" onClick={() => setIsOpen(false)} className="block hover:text-indigo-400">FAQ</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ThermalReceipt = ({ data }: { data: BillData }) => {
  return (
    <div id="thermal-receipt" className="w-[80mm] bg-white p-4 text-black font-mono text-[12px] leading-tight shadow-lg mx-auto border border-gray-200">
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold uppercase">{data.pumpName || 'PETROL PUMP NAME'}</h2>
        <p className="whitespace-pre-line">{data.address || '123, Fuel Street, New Delhi - 110001'}</p>
        <p className="mt-1">TEL: 011-23456789</p>
      </div>
      
      <div className="border-t border-dashed border-black my-2"></div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>RECEIPT NO:</span>
          <span className="font-bold">{data.receiptNo || '12345'}</span>
        </div>
        <div className="flex justify-between">
          <span>DATE/TIME:</span>
          <span>{data.dateTime ? new Date(data.dateTime).toLocaleString('en-IN') : '01/01/2024, 10:00 AM'}</span>
        </div>
        <div className="flex justify-between">
          <span>VEHICLE NO:</span>
          <span className="font-bold uppercase">{data.vehicleNo || 'DL 01 AB 1234'}</span>
        </div>
      </div>
      
      <div className="border-t border-dashed border-black my-2"></div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FUEL TYPE:</span>
          <span className="font-bold uppercase">{data.fuelType}</span>
        </div>
        <div className="flex justify-between">
          <span>RATE (Rs/L):</span>
          <span>{data.rate.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>VOLUME (L):</span>
          <span className="font-bold">{data.liters.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border-t border-black my-2"></div>
      
      <div className="flex justify-between text-lg font-bold">
        <span>TOTAL AMOUNT:</span>
        <span>Rs {data.totalAmount.toFixed(2)}</span>
      </div>
      
      <div className="border-t border-black my-2"></div>
      
      <div className="text-center mt-4 space-y-1">
        <p className="font-bold">THANK YOU!</p>
        <p>HAVE A SAFE JOURNEY</p>
        <p className="text-[10px] mt-2 italic">Generated by FuelTrace India</p>
      </div>
    </div>
  );
};

const InvoiceReceipt = ({ data }: { data: BillData }) => {
  return (
    <div id="invoice-receipt" className="w-full max-w-[210mm] bg-white p-8 text-slate-800 font-sans shadow-lg mx-auto border border-gray-200">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-indigo-600 uppercase mb-1">{data.pumpName || 'PETROL PUMP NAME'}</h2>
          <p className="text-slate-500 max-w-xs">{data.address || '123, Fuel Street, New Delhi - 110001'}</p>
        </div>
        <div className="text-right">
          <h1 className="text-4xl font-black text-slate-200 uppercase tracking-tighter">INVOICE</h1>
          <p className="text-slate-500"># {data.receiptNo || '12345'}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8 border-y border-slate-100 py-6">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</p>
          <p className="font-bold text-slate-700">Vehicle: {data.vehicleNo || 'DL 01 AB 1234'}</p>
          <p className="text-slate-500">Self-Consumption / Business Expense</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Date of Issue</p>
          <p className="font-bold text-slate-700">{data.dateTime ? new Date(data.dateTime).toLocaleDateString('en-IN') : '01/01/2024'}</p>
          <p className="text-slate-500">{data.dateTime ? new Date(data.dateTime).toLocaleTimeString('en-IN') : '10:00 AM'}</p>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2 border-slate-800 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
            <th className="py-3">Description</th>
            <th className="py-3 text-right">Rate (₹)</th>
            <th className="py-3 text-right">Quantity (L)</th>
            <th className="py-3 text-right">Total (₹)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr>
            <td className="py-4">
              <p className="font-bold text-slate-700">{data.fuelType} Fuel Filling</p>
              <p className="text-xs text-slate-500">Standard delivery at station</p>
            </td>
            <td className="py-4 text-right">{data.rate.toFixed(2)}</td>
            <td className="py-4 text-right">{data.liters.toFixed(2)}</td>
            <td className="py-4 text-right font-bold">₹{data.totalAmount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span>₹{data.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Tax (Included)</span>
            <span>₹0.00</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-slate-900 border-t border-slate-200 pt-2">
            <span>Total</span>
            <span>₹{data.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-100 text-center text-slate-400 text-xs">
        <p>This is a computer-generated document. No signature is required.</p>
        <p className="mt-1">FuelTrace India - Precision in Every Receipt</p>
      </div>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState<BillData>({
    pumpName: '',
    address: '',
    dateTime: new Date().toISOString().slice(0, 16),
    receiptNo: Math.floor(10000 + Math.random() * 90000).toString(),
    fuelType: 'Petrol',
    vehicleNo: '',
    rate: 96.72,
    totalAmount: 500,
    liters: 5.17
  });

  const [layout, setLayout] = useState<LayoutType>('Thermal');
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-calculate liters when amount or rate changes
  useEffect(() => {
    if (data.rate > 0 && data.totalAmount > 0) {
      const calculatedLiters = data.totalAmount / data.rate;
      if (calculatedLiters !== data.liters) {
        setData(prev => ({ ...prev, liters: calculatedLiters }));
      }
    }
  }, [data.rate, data.totalAmount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: name === 'rate' || name === 'totalAmount' ? parseFloat(value) || 0 : value
    }));
  };

  const downloadPDF = () => {
    setIsGenerating(true);
    const element = document.getElementById(layout === 'Thermal' ? 'thermal-receipt' : 'invoice-receipt');
    const opt = {
      margin: 0,
      filename: `FuelReceipt_${data.receiptNo}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm' as const, format: layout === 'Thermal' ? [80, 150] as [number, number] : 'a4', orientation: 'portrait' as const }
    };

    html2pdf().from(element).set(opt).save().then(() => {
      setIsGenerating(false);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <header className="bg-slate-900 text-white py-20 px-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#4f46e5_0%,transparent_50%)]"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Online Petrol Bill <span className="text-indigo-400 underline decoration-indigo-500/30">Generator</span> for India
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              FuelTrace is the most reliable <strong>petrol bill generator online</strong>. Use our <strong>petrol bill generator free</strong> tool to <strong>generate petrol bill online india</strong> in seconds. Perfect for <strong>petrol pump bill generator</strong> needs and digital record-keeping.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#generator" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2">
                Start Generating <Download className="w-5 h-5" />
              </a>
              <a href="#how-to-use" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold transition-all border border-slate-700">
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Tool Section */}
      <main id="generator" className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-indigo-100 p-3 rounded-2xl">
                <FileText className="text-indigo-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Receipt Details</h2>
                <p className="text-slate-500 text-sm">Fill in the information below</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Fuel className="w-3 h-3" /> Pump Name
                </label>
                <input 
                  type="text" 
                  name="pumpName"
                  value={data.pumpName}
                  onChange={handleInputChange}
                  placeholder="e.g. Indian Oil - Sharma Filling Station"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Address
                </label>
                <textarea 
                  name="address"
                  value={data.address}
                  onChange={handleInputChange}
                  placeholder="e.g. Plot No 45, Sector 12, Dwarka, New Delhi"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Date & Time
                </label>
                <input 
                  type="datetime-local" 
                  name="dateTime"
                  value={data.dateTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Hash className="w-3 h-3" /> Receipt No
                </label>
                <input 
                  type="text" 
                  name="receiptNo"
                  value={data.receiptNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Droplets className="w-3 h-3" /> Fuel Type
                </label>
                <select 
                  name="fuelType"
                  value={data.fuelType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Power">Power</option>
                  <option value="CNG">CNG</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Car className="w-3 h-3" /> Vehicle No
                </label>
                <input 
                  type="text" 
                  name="vehicleNo"
                  value={data.vehicleNo}
                  onChange={handleInputChange}
                  placeholder="e.g. DL 01 AB 1234"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all uppercase"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <IndianRupee className="w-3 h-3" /> Rate (₹/L)
                </label>
                <input 
                  type="number" 
                  name="rate"
                  step="0.01"
                  value={data.rate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <IndianRupee className="w-3 h-3" /> Total Amount (₹)
                </label>
                <input 
                  type="number" 
                  name="totalAmount"
                  value={data.totalAmount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Calculated Volume</p>
                <p className="text-2xl font-black text-slate-900">{data.liters.toFixed(2)} <span className="text-sm font-normal text-slate-500">Liters</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Payable</p>
                <p className="text-2xl font-black text-indigo-600">₹{data.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>

          {/* Preview Side */}
          <div className="space-y-8 sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Printer className="w-5 h-5 text-indigo-600" /> Live Preview
              </h3>
              <div className="flex bg-slate-200 p-1 rounded-xl">
                <button 
                  onClick={() => setLayout('Thermal')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${layout === 'Thermal' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Thermal
                </button>
                <button 
                  onClick={() => setLayout('Invoice')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${layout === 'Invoice' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Invoice
                </button>
              </div>
            </div>

            <div className="bg-slate-200 rounded-3xl p-8 min-h-[500px] flex items-center justify-center overflow-auto">
              {layout === 'Thermal' ? <ThermalReceipt data={data} /> : <InvoiceReceipt data={data} />}
            </div>

            <button 
              onClick={downloadPDF}
              disabled={isGenerating}
              className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isGenerating ? 'Generating PDF...' : (
                <>
                  <Download className="w-6 h-6" /> Download PDF Receipt
                </>
              )}
            </button>
            <p className="text-center text-slate-400 text-xs">
              By downloading, you agree to our terms and disclaimer.
            </p>
          </div>
        </div>
      </main>

      {/* Content Block: SEO Optimized */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">How to generate petrol bills with FuelTrace</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                If you are looking for an <strong>online petrol bill generator india</strong>, FuelTrace is your one-stop solution. Our platform allows you to <strong>generate petrol pump bill online</strong> for various oil companies like IOCL, HPCL, and BPCL. 
              </p>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Whether you need a <strong>petrol pump computer generated bill</strong> for your personal records or want to <strong>generate petrol bills online</strong> for expense tracking, our tool provides a seamless experience. We focus on providing a <strong>petrol pump bill generator</strong> that is both accurate and easy to use.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-400 w-6 h-6 mt-1 shrink-0" />
                  <p><strong>Generate petrol pump bill</strong> with real-time preview.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-400 w-6 h-6 mt-1 shrink-0" />
                  <p>Professional <strong>petrol pump computer generated bill india</strong> style.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-400 w-6 h-6 mt-1 shrink-0" />
                  <p>100% <strong>petrol bill generator free</strong> service.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Why use an online petrol bill generator?</h3>
              <p className="text-slate-400 text-sm mb-4">
                Many users search for a <strong>fake petrol bill generator</strong> or <strong>fake petrol bill generator india</strong> to recreate lost receipts for their records. FuelTrace provides a legitimate way to <strong>generate petrol pump bill online</strong> for personal documentation.
              </p>
              <p className="text-slate-400 text-sm">
                Avoid <strong>petrol pump computer generated bill cheating</strong> by keeping your own digital logs. Our tool ensures you have a backup of your fuel expenses whenever you need to <strong>generate petrol pump bill</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Block: How to Use */}
      <section id="how-to-use" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to use FuelTrace India</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Manage your fuel expenses efficiently with our professional generator tool.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Enter Station Info", desc: "Fill in the Petrol Pump name and its location. This helps in identifying where the fuel was filled.", icon: <MapPin className="w-6 h-6" /> },
              { title: "Fill Transaction Details", desc: "Input the date, time, and vehicle number. Our tool automatically calculates liters based on rate and amount.", icon: <FileText className="w-6 h-6" /> },
              { title: "Choose & Download", desc: "Select between a standard thermal receipt or a professional invoice layout and download as PDF.", icon: <Download className="w-6 h-6" /> }
            ].map((step, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors group">
                <div className="bg-white w-12 h-12 rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directory Section */}
      <section id="directory" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Petrol Pump Directory</h2>
              <p className="text-slate-500">Major oil marketing companies in India.</p>
            </div>
            <a href="#" className="text-indigo-600 font-bold flex items-center gap-1 hover:underline">
              View All Stations <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OIL_COMPANIES.map((company, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className={`${company.color} w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-white font-black text-xl`}>
                  {company.name}
                </div>
                <h3 className="font-bold text-lg mb-2">{company.fullName}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{company.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
            <h2 className="text-3xl font-bold mb-2 text-center">Contact Us</h2>
            <p className="text-slate-500 text-center mb-10">Have questions or feedback? We'd love to hear from you.</p>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-slate-500 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Fuel className="text-indigo-400 w-8 h-8" />
                <span className="text-2xl font-bold tracking-tight">FuelTrace <span className="text-indigo-400">India</span></span>
              </div>
              <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                FuelTrace India is a professional tool-suite company dedicated to providing precision in every digital receipt. Our goal is to simplify record-keeping for vehicle owners across India.
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-slate-800 p-3 rounded-xl hover:bg-slate-700 transition-colors"><ShieldCheck className="w-5 h-5" /></a>
                <a href="#" className="bg-slate-800 p-3 rounded-xl hover:bg-slate-700 transition-colors"><Mail className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#generator" className="hover:text-white transition-colors">Generator</a></li>
                <li><a href="#directory" className="hover:text-white transition-colors">Directory</a></li>
                <li><a href="#how-to-use" className="hover:text-white transition-colors">How to Use</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Legal</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} FuelTrace India. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure Local Data Processing</span>
            </div>
          </div>

          {/* Disclaimer Block */}
          <div className="mt-10 p-6 bg-slate-800/50 rounded-2xl border border-slate-800 text-xs text-slate-500 leading-relaxed">
            <p className="font-bold text-slate-400 mb-2 uppercase tracking-wider">Disclaimer:</p>
            FuelTrace India is an independent tool for personal record-keeping and educational purposes. We are not affiliated with IOCL, BPCL, HPCL, Shell, or any other oil marketing company. The receipts generated are not official tax documents. Users are responsible for the accuracy and legal use of the generated documents.
          </div>
        </div>
      </footer>
    </div>
  );
}
