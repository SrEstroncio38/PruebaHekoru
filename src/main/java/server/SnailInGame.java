package server;

import java.util.concurrent.locks.ReentrantLock;

public class SnailInGame {
	SquareCollider collider;
	final int colliderOfsetX = 50;
	final int colliderOfsetY = 50;
	float posX = 20;
	float posY = 0;
	int stamina;
	// valores iniciales
	public final int MAXSTAMINA = 100;
	public final int MAXVELOCIDAD = 20;
	public final float ACELERACION = 2f;
	public final float FRENADO = 3;

	//Valores maximos que pueden ser cambiado con power ups momentameamente
	public int maxStamina;
	public int maxVelocidad;
	public float aceleracion;
	public float frenado;
	
	
	
	public float velocidad;
	LastMovement lastMovement;
	GenericPowerUp powerUp;
	
	
	//interaccion con el escenario 
	
	ReentrantLock lastMovementLock = new ReentrantLock(); // se puede tocar tanto en el manejador de mensajes como en el loop de la sala
	

	@Override
	public String toString() {
		return "SnailInGame [collider=" + collider + ", colliderOfsetX=" + colliderOfsetX + ", colliderOfsetY="
				+ colliderOfsetY + ", posX=" + posX + ", posY=" + posY + ", stamina=" + stamina + ", MAXSTAMINA="
				+ MAXSTAMINA + ", MAXVELOCIDAD=" + MAXVELOCIDAD + ", ACELERACION=" + ACELERACION + ", maxStamina="
				+ maxStamina + ", maxVelocidad=" + maxVelocidad + ", aceleracion=" + aceleracion + ", lastMovement="
				+ lastMovement + ", powerUp=" + powerUp + "]";
	}

	public SnailInGame() {
		velocidad =0;
		maxStamina = MAXSTAMINA;
		maxVelocidad = MAXVELOCIDAD;
		aceleracion = ACELERACION;
		frenado = FRENADO;

		stamina = MAXSTAMINA;
		collider = new SquareCollider(colliderOfsetX, colliderOfsetY);
	}

	public void restoreValues() {
		maxStamina = MAXSTAMINA;
		maxVelocidad = MAXVELOCIDAD;
		aceleracion = ACELERACION;
	}

	public void usePowerUp() {
		if (powerUp != null) {
			powerUp.consumirPowerUp();
			powerUp = null;
		}
	}

	public void updateSnail() {
		
		lastMovementLock.lock();
		if(!lastMovement.isStopping) {
			velocidad +=aceleracion;
		} else {
			velocidad -= frenado;
		}
		lastMovementLock.unlock();
		
		if(velocidad > maxVelocidad) {
			velocidad = maxVelocidad;
		} else if(velocidad < 0) {
			velocidad = 0;
		}
		posX+= velocidad;
	}
	
	public void updateMovement(boolean isStoping ,boolean useObject) {
		lastMovementLock.lock();
		lastMovement = new LastMovement(isStoping,useObject);
		lastMovementLock.unlock();
	}

}
