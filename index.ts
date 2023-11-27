import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc'
import { getExpenses, saveExpense } from './services/sheets';
import { Filters, Spent } from './types/types';
import { expenseSchema, filtersSchema } from './validators/schemas';
import swaggerOptions from './swagger';

const app = express();
const port = 3000;

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hola mundo!');
});

/**
 * @openapi
 * /gastos/{from}/{to}:
 *   get:
 *     summary: Obtiene una lista de gastos
 *     description: Retorna una lista de gastos filtrada opcionalmente por fechas.
 *     parameters:
 *       - in: path
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Fecha de inicio para filtrar los gastos (incluida).
 *       - in: path
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Fecha de fin para filtrar los gastos (incluida).
 *     responses:
 *       200:
 *         description: Lista de gastos filtrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: El ID del gasto.
 *                   amount:
 *                     type: number
 *                     format: float
 *                     description: El monto del gasto.
 *                   description:
 *                     type: string
 *                     description: La descripción del gasto.
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: La fecha del gasto.
 *       400:
 *         description: Error de validación en los parámetros de entrada.
 */
app.get('/gastos/:from?/:to?', async (req, res) => {
  const filters = req.params as Filters;
  const { error } = filtersSchema.validate(filters);
  if (error) {
    return res.status(400).send(error.details);
  }
  const expenses = await getExpenses(filters);
  res.send(expenses);
});

/**
 * @openapi
 * /gastos:
 *   post:
 *     summary: Crea un nuevo gasto
 *     description: Añade un nuevo gasto a la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - description
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: El monto del gasto.
 *               description:
 *                 type: string
 *                 description: La descripción del gasto.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: La fecha del gasto.
 *     responses:
 *       200:
 *         description: Gasto creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Estado de la operación.
 *       400:
 *         description: Error de validación en los datos proporcionados.
 */
app.post('/gastos', async (req, res) => {
  const { error } = expenseSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details);
  } 
  const { body } = req;
  const expense = body as Spent;
  const status = await saveExpense(expense);
  res.send(status);
});

app.put('/gastos', (req, res) => {

});

app.listen(port, () => {
  console.log('Server running');
});
