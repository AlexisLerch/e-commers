export default function BenefitsSection() {
  return (
    <section className="bg-bgMain py-16 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="font-bold text-lg mb-2">Envíos a todo el país</h3>
          <p className="text-textMain">Recibí tu pedido donde estés.</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">Pagos seguros</h3>
          <p className="text-textMain">Protegemos todas tus transacciones.</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">Cuotas sin interés</h3>
          <p className="text-textMain">Pagá en cómodas cuotas con tarjeta.</p>
        </div>
      </div>
    </section>
  );
}
