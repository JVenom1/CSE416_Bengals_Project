package org.bengals.server;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.bson.Document;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import Models.FullData;

@WebListener
public class AppServletContextListener implements ServletContextListener{
    @Override
    public void contextInitialized(ServletContextEvent sce) {
    	MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
    	MongoDatabase database = mongoClient.getDatabase("Bengals");
    	MongoCollection<Document> collection = database.getCollection("test");	
    	Document document = collection.find().first();	
    	ObjectMapper mapper = new ObjectMapper();
    	try {
			FullData fullData = mapper.readValue(document.toJson(), FullData.class);
	    	ServletContext servletContext = sce.getServletContext(); 
	    	servletContext.setAttribute("Full Data", fullData);
	    	servletContext.setAttribute("Database", database);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
    }
}
