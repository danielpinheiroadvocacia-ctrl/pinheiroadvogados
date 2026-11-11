# Área interna (gestão de processos e financeiro)

Endereço: https://pinheiroadvogados.netlify.app/interno/
Também há um link discreto "Área interna" no rodapé de todas as páginas do site.

## Como a segurança funciona
- Cada advogado entra com o próprio e-mail e senha. O nome dele aparece automaticamente no histórico (aba Atividade).
- A Administração entra com o e-mail institucional `pinheiroadvogados.rn@gmail.com` e é a única que vê a aba **Acessos**, onde cria, bloqueia e reativa os logins.
- Os dados ficam no Firestore, protegido pelas regras do arquivo `firestore.rules`: só a Administração e advogados com acesso ativo leem ou gravam.
- Nenhum dado de cliente fica no código do site. A área interna não aparece no Google.

## Criar o acesso de um advogado (Administração)
1. Entre com o e-mail institucional e abra a aba **Acessos**.
2. Clique em **Novo acesso** e informe nome, e-mail do advogado e uma senha provisória.
3. Passe ao advogado o e-mail e a senha provisória. No primeiro acesso, ele usa **Trocar senha**.
4. Para impedir a entrada de alguém, clique em **Bloquear**. O histórico é mantido.
5. Se o advogado esquecer a senha, use **Enviar link de nova senha** ou peça que ele clique em "Esqueci a senha" na tela de login.

## Configuração (uma vez)
Siga os passos 1 a 6 do GUIA_ILUSTRADO.pdf no console do Firebase:
1. Criar o projeto `pinheiro-advogados`.
2. Ativar o login por e-mail e senha.
3. Cadastrar a Administração: `pinheiroadvogados.rn@gmail.com`, com uma senha forte. Em Configurações > Ações do usuário, deixar "Ativar criação" marcado (o sistema usa isso para criar os acessos).
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
- Quando alguém deixar o escritório, bloqueie o acesso na aba Acessos. Guarde bem a senha da Administração.
