import logo from '../../assets/images/logo.jpg';
import signature from '../../assets/images/signature.jpg';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { consolaBold, consolaNormal } from '../../utils';
import dayjs from 'dayjs';
import { IExportDataList } from '../../types';
interface IinvoiceProps {
	customerName: string;
	invoiceNo: string;
	data: IExportDataList[];
}
export const generateInvoice = ({ customerName, invoiceNo, data }: IinvoiceProps) => {
	const sortedData = [...data];
	sortedData.sort((a, b) => new Date(a.billDate).getDate() - new Date(b.billDate).getDate());
	const prepareTableData = (): RowInput[] => {
		const tableData = sortedData.length
			? sortedData.map((it, index) => [
				++index,
				`${dayjs(it.billDate).format('DD-MM-YYYY')}`,
				`${it.menuItem.name}`,
				`${it.quantity}`,
				`${it.menuItem.price}`,
				`${it.menuItem.gstValue}`,
				`${it.totalAmount}`,
			])
			: [['No Items']];
		let sumOfAmount = tableData.map((it: any) => it.slice(-1)[0] || 0).reduce((sum, it) => Number(sum) + Number(it));
		sumOfAmount = Intl.NumberFormat('en-IN').format(sumOfAmount);

		const rowInputs: RowInput[] = [
			...tableData,
			[
				{ content: 'Rupees', colSpan: 6, styles: { halign: 'right' } },
				{ content: `${sumOfAmount}`, styles: { fontStyle: 'bold' } },
			],
		];
		return rowInputs;
	};

	const doc = new jsPDF('p', 'mm', 'A4');
	const pageSize = doc.internal.pageSize;
	const pdfHeight = pageSize.getHeight();
	const getTextWidth = (text: string) => {
		return doc.getTextWidth(text);
	};
	doc.addFileToVFS('CONSOLAB-bold.ttf', consolaBold);
	doc.addFont('CONSOLAB-bold.ttf', 'CONSOLAB', 'bold');
	doc.addFileToVFS('CONSOLA-normal.ttf', consolaNormal);
	doc.addFont('CONSOLA-normal.ttf', 'CONSOLA', 'normal');
	const docHeader = () => {
		doc.addImage(logo, 'JPEG', 25, 15, 35, 35);
		doc.setFont('CONSOLAB', 'bold');
		doc.setFontSize(27);
		doc.text('Siva Sakthi Catering', 75, 25);
		doc.setFont('CONSOLA', 'normal');
		doc.setFontSize(11);
		doc.text('2/8, Mariamman Koil Street,', 75, 35);
		doc.text('Kavundampalayam,', 75, 40);
		doc.text('Coimbatore - 641030', 75, 45);
	};
	doc.setFontSize(12);
	doc.setFont('CONSOLAB', 'bold');
	doc.text('To: ', 25, 65);
	doc.setFont('CONSOLA', 'normal');
	doc.text(`${customerName}`, 25 + getTextWidth('To: '), 65);
	doc.setFont('CONSOLAB', 'bold');
	doc.text('Bill No: ', 25, 75);
	doc.setFont('CONSOLA', 'normal');
	doc.text(`${invoiceNo}`, 25 + getTextWidth('Bill No: '), 75);
	doc.setFont('CONSOLAB', 'bold');
	doc.text('PAN: ', 25, 80);
	doc.setFont('CONSOLA', 'normal');
	doc.text('AKKPU6903G', 25 + getTextWidth('PAN: '), 80);
	doc.setFont('CONSOLAB', 'bold');
	doc.text('Date: ', 25, 85);
	doc.setFont('CONSOLA', 'normal');
	doc.text(`${dayjs().format('DD/MM/YYYY')}`, 25 + getTextWidth('Date: '), 85);
	doc.setFont('CONSOLAB', 'bold');
	doc.text('GSTIN: ', 25, 90);
	doc.setFont('CONSOLA', 'normal');
	doc.text('33AKKPU6903G1ZZ', 25 + getTextWidth('GSTIN: '), 90);
	autoTable(doc, {
		theme: 'grid',
		startY: 100,
		margin: { horizontal: 25, top: 60 },
		headStyles: {
			fillColor: '#FFFFFF',
			textColor: '#000000',
			lineWidth: 0.2,
			minCellHeight: 10,
			halign: 'center',
			valign: 'middle',
			lineColor: '#000000',
		},
		bodyStyles: {
			valign: 'middle',
			minCellHeight: 10,
			halign: 'center',
			lineWidth: 0.2,
			textColor: '#000000',
			lineColor: '#000000',
		},
		didDrawPage: () => {
			docHeader();
		},
		head: [['No', 'Date', 'Items', 'Qty', 'Price', 'GST', 'Amount']],
		body: prepareTableData(),
	});
	doc.setFont('CONSOLAB', 'bold');
	doc.text('Account Details:', 25, pdfHeight - 65);
	doc.setFont('CONSOLA', 'normal');
	doc.text('Bank Name: Karur Vysya Bank', 25, pdfHeight - 60);
	doc.text('A/C No: 1675155000009498', 25, pdfHeight - 55);
	doc.text('IFSC Code: KVBL0001675', 25, pdfHeight - 50);
	doc.addImage(signature, 'JPEG', 25, pdfHeight - 35, 40, 6);
	doc.setFont('CONSOLAB', 'bold');
	doc.text('Signature', 25, pdfHeight - 25);
	// doc.save(`Invoice-${dayjs().format('DDMMMYYYYHHmmss')}`);
	// return `${doc.output('bloburi')}`;
	return doc.output('dataurlnewwindow');
};
