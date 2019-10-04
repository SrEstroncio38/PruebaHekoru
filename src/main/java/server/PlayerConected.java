package server;

import org.springframework.web.socket.WebSocketSession;

public class PlayerConected {
	private WebSocketSession session;
	private String nombre;
	public SnailInGame mySnail;
	public PlayerConected(WebSocketSession session, String nombre) {
		this.session = session;
		this.nombre = nombre;
		mySnail = new SnailInGame();
	}
	public WebSocketSession getSession() {
		return session;
	}
	public void setSession(WebSocketSession session) {
		this.session = session;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
}
