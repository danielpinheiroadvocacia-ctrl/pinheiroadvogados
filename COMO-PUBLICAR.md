# Site Pinheiro Advogados: como publicar e gerenciar

- Site: https://pinheiroadvogados.netlify.app
- Painel de conteúdo: https://pinheiroadvogados.netlify.app/admin
- Repositório: https://github.com/danielpinheiroadvocacia-ctrl/pinheiroadvogados

## Estrutura
- `index.html`: página inicial (escritório, áreas, novidades, publicações recentes, contato)
- `areas/*.html`: uma página por área de atuação, cada uma com sua lista de publicações
- `artigo.html`: página de leitura de cada publicação
- `novidades.html` e `novidade.html`: Novidades e informações jurídicas (menu), com filtro por categoria
- `equipe.html`: Equipe jurídica (menu)
- `data/artigos.json`, `data/novidades.json` e `data/equipe.json`: conteúdo (editado pelo painel)
- `admin/`: painel de conteúdo (Decap CMS) em `seusite/admin`
- `marca/`: logo e símbolo em SVG (claro e escuro), extraídos do PDF da identidade visual

## 1. Publicar com o painel funcionando (recomendado)
O painel grava os textos num repositório do GitHub, e o Netlify republica o site automaticamente.

1. Crie uma conta gratuita no GitHub e um repositório (atual: `danielpinheiroadvocacia-ctrl/pinheiroadvogados`).
2. Envie todos os arquivos desta pasta para o repositório (botão "Add file > Upload files").
3. O `admin/config.yml` já aponta para este repositório.
4. No Netlify: "Add new project > Import an existing project > GitHub" e escolha o repositório. Não há comando de build; o diretório de publicação é a raiz.
5. Crie o app de login no GitHub: Settings > Developer settings > OAuth Apps > New OAuth App.
   - Homepage URL: o endereço do site
   - Redirect URI (antes chamado "Authorization callback URL"): `https://api.netlify.com/auth/done`
   - Copie o Client ID e gere um Client Secret.
6. No Netlify: Project configuration > Security > OAuth > Install provider > GitHub, e cole o Client ID e o Secret.
7. Acesse `https://pinheiroadvogados.netlify.app/admin`, entre com o GitHub e publique.
   - Publicações > Artigos e conteúdos: escolha a área; o artigo aparece na página da área e em "Conteúdos recentes".
   - Novidades e informações jurídicas > Novidades: escolha a categoria (Legislação, Jurisprudência, Notícias, Prazos, Comunicados) e, se houver, o link da fonte oficial.
   - Equipe jurídica > Profissionais: nome, cargo, OAB, titulação, especializações e, quando houver, foto (sem foto, o perfil aparece só em texto).

Quem for publicar precisa ter acesso de escrita ao repositório no GitHub.

## 4. Como editar o conteúdo depois de publicado
Acesse `https://pinheiroadvogados.netlify.app/admin` e entre com a conta do GitHub. Em cada seção, edite e clique em **Publish** (Publicar). O site é atualizado em cerca de 1 a 2 minutos.

- **Conteúdo em uma área de atuação:** Publicações > Artigos e conteúdos > Add Artigo. Preencha título, endereço (ex.: `guarda-compartilhada`), escolha a área, data, resumo e texto.
- **Novidade:** Novidades e informações jurídicas > Novidades > Add Novidade. Escolha a categoria e, se houver, informe a fonte oficial com link.
- **Foto de um profissional:** Equipe jurídica > Profissionais > abra o nome > campo Foto > envie a imagem (de preferência vertical, 4:5, até 1 MB).
- **Alterar descrição da equipe:** no mesmo lugar, edite Cargo, Titulação e Especializações (uma por linha). Para mudar a ordem, arraste os profissionais na lista.
- **Novo profissional:** Add Profissional no fim da lista.

Para dar acesso ao painel a outra pessoa do escritório: no GitHub, abra o repositório > Settings > Collaborators > Add people.

## 2. Publicação rápida, sem painel
Arraste a pasta em app.netlify.com/drop. O site funciona, mas para incluir artigos ou profissionais será preciso editar os arquivos `data/*.json` à mão e reenviar a pasta.

## 3. Domínio próprio
Registre o domínio (ex.: no Registro.br) e, na zona DNS do Registro.br, crie:
- A, nome vazio (@), valor `75.2.60.5`
- CNAME, nome `www`, valor `pinheiroadvogados.netlify.app`
Depois adicione o domínio em Netlify > Domain management. O HTTPS é emitido automaticamente.

## Antes de publicar
- Inclua o número de inscrição na OAB no rodapé (procure "IMPORTANTE" nos arquivos .html), ou peça que ele seja incluído.
