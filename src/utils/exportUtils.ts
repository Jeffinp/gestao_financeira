import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { Transacao } from '../types';

// Estender o tipo jsPDF para incluir autoTable
declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

interface ExportOptions {
    title?: string;
    period?: string;
    saldo: number;
    ganhosMes: number;
    gastosMes: number;
    transacoes?: Transacao[];
    transacoesRecentes?: Transacao[];
    categorias?: Array<{ nome: string; valor: number; cor?: string }>;
}

export const exportToPDF = (data: ExportOptions) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const title = data.title || 'Relatório Financeiro';
    const period = data.period || new Date().toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
    });
    const transacoes = data.transacoes || data.transacoesRecentes || [];

    // Header
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246); // shop-primary color
    doc.text(title, pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139); // muted color
    doc.text(`Período: ${period}`, pageWidth / 2, 30, { align: 'center' });
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, pageWidth / 2, 38, { align: 'center' });

    // Resumo Financeiro
    let yPosition = 55;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Resumo Financeiro', 20, yPosition);

    yPosition += 15;
    const resumoData = [
        ['Saldo Total', `R$ ${data.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Receitas do Mês', `R$ ${data.ganhosMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Despesas do Mês', `R$ ${data.gastosMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`],
        ['Saldo Líquido', `R$ ${(data.ganhosMes - data.gastosMes).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`]
    ];

    doc.autoTable({
        startY: yPosition,
        head: [['Indicador', 'Valor']],
        body: resumoData,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 20, right: 20 }
    });

    // Gastos por Categoria (se disponível)
    if (data.categorias && data.categorias.length > 0) {
        yPosition = (doc as any).lastAutoTable.finalY + 20;
        doc.setFontSize(16);
        doc.text('Gastos por Categoria', 20, yPosition);

        yPosition += 10;
        const categoriaData = data.categorias.map(cat => [
            cat.nome,
            `R$ ${cat.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
            `${((cat.valor / data.gastosMes) * 100).toFixed(1)}%`
        ]);

        doc.autoTable({
            startY: yPosition,
            head: [['Categoria', 'Valor', 'Percentual']],
            body: categoriaData,
            theme: 'grid',
            styles: { fontSize: 9 },
            headStyles: { fillColor: [59, 130, 246] },
            margin: { left: 20, right: 20 }
        });
    }

    // Nova página para transações se necessário
    if ((doc as any).lastAutoTable && (doc as any).lastAutoTable.finalY > 220) {
        doc.addPage();
        yPosition = 20;
    } else {
        yPosition = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 20 : 100;
    }

    // Transações Recentes
    if (transacoes.length > 0) {
        doc.setFontSize(16);
        doc.text('Transações Recentes', 20, yPosition);

        yPosition += 10;
        const transacoesData = transacoes.slice(0, 10).map(t => [
            new Date(t.data).toLocaleDateString('pt-BR'),
            t.descricao,
            t.categoria,
            t.tipo === 'ganho' ? 'Receita' : 'Despesa',
            `R$ ${t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        ]);

        doc.autoTable({
            startY: yPosition,
            head: [['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor']],
            body: transacoesData,
            theme: 'grid',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [59, 130, 246] },
            margin: { left: 20, right: 20 },
            columnStyles: {
                1: { cellWidth: 40 },
                4: { halign: 'right' }
            }
        });
    }

    // Footer
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(
            `Página ${i} de ${totalPages}`,
            pageWidth / 2,
            doc.internal.pageSize.height - 10,
            { align: 'center' }
        );
    }

    // Salvar o PDF
    const fileName = `relatorio-financeiro-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
};

export const exportToCSV = (transacoes: Transacao[]) => {
    const headers = ['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor', 'Recorrente'];
    const csvContent = [
        headers.join(','),
        ...transacoes.map(t => [
            t.data,
            `"${t.descricao || ''}"`,
            `"${t.categoria}"`,
            t.tipo,
            t.valor.toString().replace('.', ','),
            t.recorrente ? 'Sim' : 'Não'
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transacoes-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToJSON = (data: any) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `dados-financeiros-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
