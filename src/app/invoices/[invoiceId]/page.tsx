import Invoice from '@/lib/routes/Invoice';

type InvoicePageProps = {
	params: Promise<{ invoiceId: string }>;
};

export default async function InvoicePage({ params }: InvoicePageProps) {
	const { invoiceId } = await params;
	return <Invoice invoiceId={invoiceId} />;
}
