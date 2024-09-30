# Site do Espaço Alcançar (Versão 3.0)

## Paleta de cores

#57949F verde-claro
#1E4857 verde-escuro
#DB876D pessego
#C49DA5 lilas
#F5DDD5 rosa-suave
#FAC957 amarelo

#1C1C1C preto
#989898 cinza-escuro
#D9D9D9 cinza-medio
#EAEAEA cinza-claro

## Fontes de texto

### destaque-gg

font-family: Raleway;
font-size: 40px;
font-style: normal;
font-weight: 900;
line-height: normal;

### destaque-g

font-family: Raleway;
font-size: 26px;
font-style: normal;
font-weight: 900;
line-height: normal;

### destaque

font-family: Raleway;
font-size: 18px;
font-style: normal;
font-weight: 900;
line-height: normal;

### destaque-p

font-family: Raleway;
font-size: 14px;
font-style: normal;
font-weight: 900;
line-height: normal;

### Títulos <h1>

font-family: Quicksand;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;

### Subtítulos <h2>

font-family: Quicksand;
font-size: 12px;
font-style: normal;
font-weight: 600;
line-height: normal;

### Parágrafos <p>

font-family: Quicksand;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;

### Citação <q>

font-family: Raleway;
font-size: 12px;
font-style: italic;
font-weight: 300;
line-height: normal;

### placeholder

font-family: Quicksand;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;

---

Instruções para gerar uma Página Estática

1. Primeiro, você precisa gerar uma versão estática do seu site. Isso pode ser feito usando o comando next export. Este comando gera uma versão estática do seu site na pasta out, que pode ser servida por qualquer servidor de arquivos estáticos.

2. Antes de executar o comando next export, certifique-se de que o seu arquivo next.config.js está configurado corretamente. Para sites estáticos, você pode precisar adicionar a opção exportPathMap para definir as rotas do seu site.

3. Após a execução bem-sucedida do comando next export, a pasta out conterá o seu site estático pronto para ser hospedado. Você pode fazer o upload desta pasta para o diretório public_html no seu host1.

4. Certifique-se de que as permissões do diretório public_html estão corretas. O diretório public_html deve ter a permissão 755, as pastas internas devem ter a permissão 755 e os arquivos internos devem ter a permissão 6442.
