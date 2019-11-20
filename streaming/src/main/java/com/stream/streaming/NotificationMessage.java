package com.stream.streaming;

import lombok.Data;

import java.util.Date;

@Data
public class NotificationMessage {

    private String broadcasterId;
    private String title;
    private Date time;
	public String getBroadcasterId() {
		return broadcasterId;
	}
	public void setBroadcasterId(String broadcasterId) {
		this.broadcasterId = broadcasterId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
    
    
    
}
