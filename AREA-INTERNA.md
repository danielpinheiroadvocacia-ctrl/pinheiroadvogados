# Área interna (gestão de processos e financeiro)

Endereço: https://pinheiroadvogados.netlify.app/interno/
Também há um link discreto "Área interna" no rodapé de todas as páginas do site.

## Como a segurança funciona
- Cada sócio entra com o próprio e-mail e senha (Firebase Authentication).
- Os dados (clientes, prazos, honorários, despesas) ficam no banco Firestore, protegido por regras que só liberam os e-mails da equipe.
- Nenhum dado de cliente fica no código do site. O código é público no GitHub; os dados, não.
- A área interna não aparece no Google (noindex e robots.txt).

## Configuração (uma vez)
Siga os passos 1 a 6 do GUIA_ILUSTRADO.pdf no console do Firebase:
1. Criar o projeto `pinheiro-advogados`.
2. Ativar o login por e-mail e senha.
3. Cadastrar os 4 usuários (e-mail + senha provisória).
4. Criar o Firestore em `southamerica-east1 (São Paulo)`, modo produção.
5. Colar as regras de `firestore.rules`, com os 4 e-mails reais, e publicar.
6. Registrar o app web e copiar o bloco `firebaseConfig`.

Em vez dos passos 7 e 8 do guia (editar o arquivo e usar o Netlify Drop), envie ao Claude o bloco `firebaseConfig` e os 4 e-mails. Ele preenche `interno/index.html` e publica.
O `firebaseConfig` não é senha: ele identifica o projeto e fica visível no navegador por natureza. A proteção está nas regras do Firestore. Nunca envie as senhas dos usuários.

Depois:
7. No Firebase, em Authentication > Settings > Authorized domains, adicione `pinheiroadvogados.netlify.app`.
8. Acesse a área interna, entre com o seu e-mail e use "Esqueci a senha" para trocar a senha provisória.

## Trazer os dados da versão anterior
Na versão local (PINHEIRO_ADVOGADOS_Gestao.html), clique em "Exportar backup".
Na área interna, depois de entrar, clique em "Importar backup" e escolha o arquivo. Os nomes antigos dos responsáveis são corrigidos na importação.

## Cuidados
- Faça "Exportar backup" toda semana e guarde o arquivo em local seguro.
- Ao trocar um sócio: atualize EQUIPE em `interno/index.html`, as regras do Firestore e remova o usuário em Authentication.
