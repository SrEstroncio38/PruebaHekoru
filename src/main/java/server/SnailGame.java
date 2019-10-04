package server;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.WebSocketSession;

public class SnailGame {
	SinglePlayerRoom room1;
	MultiplayerRoom room2 = new MultiplayerRoom("sala2");
	//hay que hacer un mapa 
	ConcurrentHashMap<WebSocketSession,PlayerConected> jugadoresConectados = new ConcurrentHashMap<WebSocketSession, PlayerConected>();
	
	public void conectarJugador(PlayerConected jugador) {
		jugadoresConectados.putIfAbsent(jugador.getSession(), jugador);
	}
	
	public PlayerConected bucarJugadorConectado(WebSocketSession session) {
		return jugadoresConectados.get(session);
	}
	
	public void createSingleRoom() {
		
	}

}
