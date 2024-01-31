const serverModule = require("../../app/lib/server");

describe("Server", () => {
  let server;
  let handleUnhandledRejectionMock;
  let exitMock;

  beforeAll(async () => {
    server = await serverModule.init();
    handleUnhandledRejectionMock = jest.spyOn(
      serverModule,
      "handleUnhandledRejection"
    );
    exitMock = jest.spyOn(process, "exit").mockImplementation(() => {});
  });

  afterAll(async () => {
    await server.stop();
    handleUnhandledRejectionMock.mockRestore();
    exitMock.mockRestore();
  });

  test("deve inicializar o servidor", async () => {
    expect(typeof server).toBe("object");
  });

  test("deve ter rotas configuradas", async () => {
    const routes = server.table();
    expect(routes).toHaveLength(6);
  });

  test("deve iniciar o servidor", async () => {
    const startedServer = await serverModule.start();
    expect(typeof startedServer).toBe("object");
  });

  test("deve lidar com um erro não tratado corretamente", () => {
    const mockError = new Error("Erro não tratado");
    serverModule.handleUnhandledRejection(mockError);
    expect(handleUnhandledRejectionMock).toHaveBeenCalledWith(mockError);
  });

 });
