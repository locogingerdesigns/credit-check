import { 
    WebSocketGateway, 
    SubscribeMessage, 
    MessageBody  
  } from '@nestjs/websockets';
  
  @WebSocketGateway()
  export class AppGateway {
  
    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: string) {
      // handle incoming message
    }
  
    @SubscribeMessage('join')
    handleJoin(client: any) {
      // handle client join 
    }
  
    afterInit(server: any) {
      // called after server init
    }
  
    handleDisconnect(client: any) {
      // handle client disconnect
    }
  
  }
  