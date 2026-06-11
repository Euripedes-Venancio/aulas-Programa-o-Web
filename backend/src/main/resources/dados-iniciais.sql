-- Execute após subir a aplicação pela primeira vez (ela cria as tabelas automaticamente)

USE pastelaria;

INSERT INTO produtos (nome, imagem, descritivo, valor, estoque, keywords) VALUES
  ("Pastel de 'Flango'",  '/pastel-de-pombo.png',     'Delicioso pastel de Pombo... venha provar essa iguaria!',   12.00, 50, 'flango, pombo, pastel'),
  ("Pastel de 'Carne'",   '/pastel-de-cachorro.png',  'Clássico pastel de carne... 100% ingredientes especiais.',  11.00, 30, 'pastel, carne, cachorro'),
  ('Pastel Especial',     '/pastel-de-rato.png',      'Magnífico pastel... experiência única garantida.',          20.00,  5, 'pastel, especial, rato'),
  ('Pastel de Goiaba',    '/pastel-de-goiaba.jpeg',   'Delicioso pastel de goiaba, doce e irresistível.',          30.00, 15, 'pastel, goiaba'),
  ('Caldo de Cana',       '/imagem-caldo-de-cana.jpg','Caldo de cana feito na hora, refrescante e natural.',        7.00, 10, 'caldo de cana');
