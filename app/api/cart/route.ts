import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  const { userId, productId, quantity } = await req.json();

  // Primero, verificar si ya existe el producto en el carrito
  const { data: existingItem, error: fetchError } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (existingItem) {
    // Si ya existe, actualizar la cantidad
    const { error: updateError } = await supabase
      .from("carts")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id);

    if (updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 });

    return NextResponse.json({ message: "Cantidad actualizada" });
  }

  // Si no existe, crear un nuevo item
  const { error: insertError } = await supabase.from("carts").insert({
    user_id: userId,
    product_id: productId,
    quantity,
  });

  if (insertError)
    return NextResponse.json({ error: insertError.message }, { status: 500 });

  return NextResponse.json({ message: "Producto agregado al carrito" });
}
