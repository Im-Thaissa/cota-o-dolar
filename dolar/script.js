const URL_API = "https://economia.awesomeapi.com.br/json/last/USD-BRL";

function formatarReal(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
}

async function buscarCotacao() {
  try {
    const resposta = await fetch(URL_API);

    if (!resposta.ok) {
      throw new Error("A API respondeu com o status " + resposta.status);
    }

    const dados = await resposta.json();

    const dolar = dados.USDBRL;

    document.getElementById("valorAtual").textContent = formatarReal(dolar.bid);
    document.getElementById("valorMaximo").textContent = formatarReal(
      dolar.high,
    );
    document.getElementById("valorMinimo").textContent = formatarReal(
      dolar.low,
    );

    const pct = Number(dolar.pctChange);
    const elVariacao = document.getElementById("variacao");
    elVariacao.textContent = (pct >= 0 ? "▲ +" : "▼ ") + pct.toFixed(2) + "%";
    elVariacao.className = "variacao " + (pct >= 0 ? "sobe" : "desce");

    document.getElementById("atualizacao").textContent =
      "Cotação de " + dolar.create_date + " · atualiza a cada 10 segundos";
  } catch (erro) {
    const elErro = document.getElementById("erro");
    elErro.textContent = "Não foi possível carregar a cotação: " + erro.message;
    elErro.style.display = "block";
    document.getElementById("valorAtual").textContent = "--";
  }
}

buscarCotacao();
