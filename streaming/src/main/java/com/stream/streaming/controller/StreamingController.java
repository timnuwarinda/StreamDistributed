package com.stream.streaming.controller;

import com.stream.streaming.NotificationMessage;
import com.stream.streaming.config.JwtConfigurationUtility;
import com.stream.streaming.model.Streaming;
import com.stream.streaming.service.KafkaService;
import com.stream.streaming.service.StreamingService;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/stream")
public class StreamingController {

	@Autowired
	JwtConfigurationUtility jwt;

	@Autowired
	StreamingService streamingService;
	@Autowired
	KafkaService kafkaService;

	/**
	 * @GetMapping("/get") public Streaming getStreaming(String title){ return
	 * streamingService.getStreaming(title); }
	 */

	@GetMapping("/getAll")
	public List<Streaming> getStreaming() {
		return streamingService.getAllStreaming();
	}

	@GetMapping("/add/{broadcasterId}/{title}")
	@CrossOrigin
	public ResponseEntity<?> addStreaming(@PathVariable("broadcasterId") String broadcasterId,
			@PathVariable String title) throws IOException {
		System.out.println("here we goo :: " + title + " this is broadcaster " + broadcasterId);
		Streaming streaming = new Streaming();
		streaming.setStreamKey(jwt.doGenerateToken(broadcasterId));
		streaming.setBroadcasterId(broadcasterId);
		streaming.setTime(new Date());
		streaming.setTitle(title);

		NotificationMessage message = new NotificationMessage();
		streamingService.addStreaming(streaming);
		message.setBroadcasterId(streaming.getBroadcasterId());
		message.setTitle(streaming.getTitle());
		message.setTime(new Date());
		kafkaService.publishNotificationMessage(message);
		JSONObject message2 = new JSONObject();
		message2.put("message", "Stream saved sucessfully");
		return ResponseEntity.ok(message2);
	}

	@PostMapping("/delete")
	public void deleteStream(@RequestBody Streaming streaming) {
		streamingService.deleteStreaming(streaming);
	}

}
