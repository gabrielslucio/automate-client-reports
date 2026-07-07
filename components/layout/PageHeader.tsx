import { appConfig } from "@/config/app.config";
import { textStyles } from "@/styles/variants";

export function PageHeader() {
  return (
    <header className="mb-10">
      <div className={textStyles.eyebrow}>{appConfig.badge}</div>

      <h1 className={`${textStyles.h1} mt-5`}>
        Transforma ficheiros CSV em relatórios profissionais.
      </h1>

      <p className={`${textStyles.body} mt-4 max-w-2xl text-lg`}>
        Carrega dados de campanhas, vendas ou performance e gera um relatório
        visual em segundos.
      </p>
    </header>
  );
}