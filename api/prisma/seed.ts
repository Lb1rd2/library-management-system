import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const catalog = {
  'Science Fiction': [
    { title: 'Dune', author: 'Frank Herbert', publishedYear: 1965 },
    { title: 'Neuromancer', author: 'William Gibson', publishedYear: 1984 },
    { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', publishedYear: 1969 },
    { title: 'Snow Crash', author: 'Neal Stephenson', publishedYear: 1992 },
  ],
  Fantasy: [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', publishedYear: 1937 },
    { title: 'A Wizard of Earthsea', author: 'Ursula K. Le Guin', publishedYear: 1968 },
    { title: 'The Name of the Wind', author: 'Patrick Rothfuss', publishedYear: 2007 },
    { title: 'Mistborn: The Final Empire', author: 'Brandon Sanderson', publishedYear: 2006 },
  ],
  'African Literature': [
    { title: 'Things Fall Apart', author: 'Chinua Achebe', publishedYear: 1958 },
    { title: 'Weep Not, Child', author: 'Ngũgĩ wa Thiong’o', publishedYear: 1964 },
    { title: 'Half of a Yellow Sun', author: 'Chimamanda Ngozi Adichie', publishedYear: 2006 },
    { title: 'Nervous Conditions', author: 'Tsitsi Dangarembga', publishedYear: 1988 },
  ],
  Mystery: [
    { title: 'And Then There Were None', author: 'Agatha Christie', publishedYear: 1939 },
    { title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle', publishedYear: 1902 },
    { title: 'Gone Girl', author: 'Gillian Flynn', publishedYear: 2012 },
    { title: 'The Big Sleep', author: 'Raymond Chandler', publishedYear: 1939 },
  ],
};

async function main() {
  let n = 0;
  for (const [name, books] of Object.entries(catalog)) {
    const genre = await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    await prisma.book.createMany({
      data: books.map((b) => ({
        ...b,
        isbn: `978000000${String(++n).padStart(4, '0')}`,
        totalCopies: 3,
        availableCopies: 3,
        genreId: genre.id,
      })),
      skipDuplicates: true,
    });
  }

  const password = await bcrypt.hash('Password123!', 10);
  await prisma.user.upsert({
    where: { email: 'librarian@example.com' },
    update: {},
    create: { email: 'librarian@example.com', name: 'Test Librarian', password, role: 'LIBRARIAN' },
  });
  await prisma.user.upsert({
    where: { email: 'patron@example.com' },
    update: {},
    create: { email: 'patron@example.com', name: 'Test Patron', password, role: 'PATRON' },
  });

  console.log('Seeded.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());