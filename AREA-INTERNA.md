# Área interna (gestão de processos e financeiro)

Endereço: https://pinheiroadvogados.netlify.app/interno/
Também há um link discreto "Área interna" no rodapé de todas as páginas do site.

## Como a segurança funciona
- O acesso é feito com um único login: o e-mail institucional `pinheiroadvogados.rn@gmail.com` e a senha definida no Firebase.
- Depois de entrar, escolha em "Usando" quem está operando. O nome fica lembrado naquele aparelho e aparece no histórico (aba Atividade).
- Os dados (clientes, prazos, honorários, despesas) ficam no banco Firestore, protegido por regras que só liberam o e-mail institucional (arquivo `firestore.rules`).
- Nenhum dado de cliente fica no código do site. O código é público no GitHub; os dados, não.
- A área interna não aparece no Google (noindex e robots.txt).

## Configuração (uma vez)
Siga os passos 1 a 6 do GUIA_ILUSTRADO.pdf no console do Firebase:
1. Criar o projeto `pinheiro-advogados`.
2. Ativar o login por e-mail e senha.
3. Cadastrar um único usuário: `pinheiroadvogados.rn@gmail.com`, com uma senha forte.
4. Criar o Firestore em `southamerica-east1 (São Paulo)`, modo produção.
5. Colar as regras do arquivo `firestore.rules` deste repositório (já com o e-mail institucional) e publicar.
6. Registrar o app web e copiar o bloco `firebaseConfig`.

Projeto Firebase: `pinheiro-advogados-e689b` (plano gratuito Spark). As chaves já estão em `interno/index.html`.
O `firebaseConfig` não é senha: ele identifica o projeto e fica visível no navegador por natureza. A proteção está nas regras do Firestore. Nunca envie a senha.

Depois:
7. No Firebase, em Authentication > Settings > Authorized domains, adicione `pinheiroadvogados.netlify.app`.
8. Acesse a área interna e entre com o e-mail institucional. "Esqueci a senha" envia o link de troca para esse e-mail.

## Trazer os dados da versão anterior
Na versão local (PINHEIRO_ADVOGADOS_Gestao.html), clique em "Exportar backup".
Na área interna, depois de entrar, clique em "Importar backup" e escolha o arquivo. Os nomes antigos dos responsáveis são corrigidos na importação.

## Cuidados
- Faça "Exportar backup" toda semana e guarde o arquivo em local seguro.
- A senha é compartilhada pela equipe: troque-a sempre que alguém deixar o escritório (Firebase > Authentication > Users, ou "Esqueci a senha").
