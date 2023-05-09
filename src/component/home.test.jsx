// importar el método createTask

import { createTask, getTasks } from './utils.jsx';


// simular la respuesta de fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('createTask', () => {
  it('should call fetch with correct parameters', async () => {
    const task = 'Comprar leche';
    const url = 'http://localhost:8081/api/tasks';
    const expectedBody = JSON.stringify({
      descripcion: task,
      vigente: true,
    });

    await createTask(task);

    expect(fetch).toHaveBeenCalledWith(`${url}/crearTarea`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: expectedBody,
    });
  });

  it('should call getTasks after successfull creation', async () => {
    const mockGetTasks = jest.fn();
    await createTask('Comprar leche',mockGetTasks());
    expect(mockGetTasks).toHaveBeenCalled();

  });

  it('should throw an error when fetch fails', async () => {
    const expectedError = new Error('Fetch error');
    global.fetch.mockImplementationOnce(() => Promise.reject(expectedError));
  });
});
