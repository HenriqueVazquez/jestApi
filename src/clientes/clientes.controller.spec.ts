import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/createCliente.dto';
import { Cliente } from './schema/clientes.schema';

describe('ClientesController', () => {
  let controller: ClientesController;
  let service: ClientesService;

  const mockClientesService = {
    create: jest.fn((dto: CreateClienteDto) => ({
      _id: '1',
      ...dto,
    })),
    findAll: jest.fn(() => [
      { _id: '1', name: 'Cliente 1' },
      { _id: '2', name: 'Cliente 2' },
    ]),
    findOne: jest.fn((id: string) => ({ _id: id, name: 'Cliente 1' })),
    update: jest.fn((id: string, cliente: Partial<Cliente>) => ({
      _id: id,
      ...cliente,
    })),
    remove: jest.fn((id: string) => ({ deleted: true, _id: id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [
        {
          provide: ClientesService,
          useValue: mockClientesService,
        },
      ],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
    service = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a cliente', async () => {
    const dto: CreateClienteDto = { name: 'Henrique', email: 'test@test.com' };
    expect(await controller.create(dto)).toEqual({
      _id: '1',
      ...dto,
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all clientes', async () => {
    expect(await controller.findAll()).toEqual([
      { _id: '1', name: 'Cliente 1' },
      { _id: '2', name: 'Cliente 2' },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one cliente', async () => {
    expect(await controller.findOne('1')).toEqual({ _id: '1', name: 'Cliente 1' });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a cliente', async () => {
    const updateData = { name: 'Cliente Atualizado' };
    expect(await controller.update('1', updateData)).toEqual({
      _id: '1',
      ...updateData,
    });
    expect(service.update).toHaveBeenCalledWith('1', updateData);
  });

  it('should remove a cliente', async () => {
    expect(await controller.remove('1')).toEqual({ deleted: true, _id: '1' });
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
