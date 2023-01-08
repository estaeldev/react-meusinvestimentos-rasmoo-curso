import styles from "./home.module.scss";

export function HomePage() {

  return (
    <div>
      <header>
          <div className={styles.header_container}>
              <div className={styles.header_primeira_linha}>
                  <div className={styles.perfil_usuario}>
                      <div className={styles.perfil_imagem}>
                          <img src="imagens/cartao.png" alt="" />
                      </div>
                      <div className={styles.perfil_informacoes}>
                          <span className={styles.span_fino}>Bem-vindo,</span>
                          <span className={styles.span_grosso}>Usuário</span>
                      </div>
                  </div>

                  <div className={styles.ocultar_valores}>
                      <img src="imagens/olho.png" alt="" />
                      <span>Ocultar Valores</span>
                  </div>

              </div>

              <div className={styles.header_segunda_linha}>

                  <div className={styles.header_card}>
                      <div className={styles.header_card_infos}>
                          <span className={styles.span_fino}>Saldo da Conta</span>
                          <span className={styles.span_grosso}>R$45.000</span>
                      </div>
                      <button>
                          <img src="imagens/mais.png" alt="" />
                      </button>
                  </div>

                  <div className={styles.header_card}>
                      <div className={styles.header_card_infos}>
                          <span className={styles.span_fino}>Total Investido</span>
                          <span className={styles.span_grosso}>R$45.000</span>
                      </div>
                  </div>

                  <div className={styles.header_card}>
                      <div className={styles.header_card_infos}>
                          <span className={styles.span_fino}>Saldo Total</span>
                          <span className={styles.span_grosso}>R$45.000</span>
                      </div>
                  </div>
              </div>
          </div>
      </header>

      <main>
          <div className={styles.main_container}>

              <div className={styles.main_coluna}>
                  <h2>Meus Investimentos por tipo</h2>
                  <div className={styles.main_card}>
                      <div className={styles.main_grafico}>
                          <span>100%</span>
                      </div>
                      <div className={styles.main_descricao_grafico}>
                          <span className={styles.primeira_tag}>Renda Fixa</span>
                          <span className={styles.segunda_tag}>Renda Variável</span>
                          <span className={styles.terceira_tag}>Fundos</span>
                          <span className={styles.quarta_tag}>Ofertas Públicas</span>
                      </div>
                  </div>
              </div>

              <div className={styles.main_coluna}>
                  <h2>Meus Investimentos por tipo</h2>
                  <div className={styles.main_card}>
                      <div className={styles.main_grafico}>
                          <span>100%</span>
                      </div>
                      <div className={styles.main_descricao_grafico}>
                          <span className={styles.primeira_tag}>Renda Fixa</span>
                          <span className={styles.segunda_tag}>Renda Variável</span>
                          <span className={styles.terceira_tag}>Fundos</span>
                          <span className={styles.quarta_tag}>Ofertas Públicas</span>
                      </div>
                  </div>
              </div>

              <div className={styles.main_coluna}>
                  <button>Meus Investimentos</button>
                  <button>Investir</button>
              </div>

          </div>
      </main>
    </div>
  )
  
}