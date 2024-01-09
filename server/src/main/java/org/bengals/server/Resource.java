package org.bengals.server;

import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.bson.Document;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import Models.FullData;



@Path("")    
public class Resource{
	
	public FullData fullData;
	public MongoCollection<Document> dpCollection; 
	public ResponseBuilder result = Response.status(200).header("Access-Control-Allow-Credentials", "true").header("Access-Control-Allow-Headers","origin, content-type, accept, authorization").header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS, HEAD").header("Access-Control-Allow-Origin", "*").header("Access-Control-Max-Age", "1209600");
	
	@Context
    public void init(ServletContext servletContext) {
    	fullData = (FullData) servletContext.getAttribute("Full Data");
    	MongoDatabase database = (MongoDatabase) servletContext.getAttribute("Database");
    	dpCollection = database.getCollection("DPCollection");	    
	}
	
    @GET
    @Path("/{state}")    
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInfo(@PathParam("state") int state) throws JsonMappingException, JsonProcessingException {
    	MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
    	MongoDatabase database = mongoClient.getDatabase("Bengals");
    	MongoCollection<Document> collection = database.getCollection("test");	
    	Document document = collection.find().first();	
    	ObjectMapper mapper = new ObjectMapper();
    	FullData testData = mapper.readValue(document.toJson(), FullData.class);
        return result.entity(testData.getStates()[state]).build();	//state = 0: Winsconsin, state = 1: Maryland, state = 2: North Carolina
    }
    @GET
    @Path("/{state}/{ensembleIndex}/distance_measures")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDistanceMeasure(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getDistancemeasures()).build();    			    	
    }
    @GET
    @Path("/{state}/{ensembleIndex}/distance_measuresop")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDistanceMeasureop(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getDistancemeasuresop()).build();    			    	
    }
	//GUI-3 Display the current district plan by default
    @GET
    @Path("/{state}/2020plan")    
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStateDistrictPlan(@PathParam("state") int state) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getCurrentplan()).build();	//state = 0: Winsconsin, state = 1: Maryland, state = 2: North Carolina
    }
    
    //GUI-4 Display a summary of initial cluster analysis in a table
    @GET
    @Path("/{state}/{ensembleIndex}/inital_summary")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInitialClusterSummary(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getInitialclusterdetails()).build();    			    	
    }
    
    //Return table of ensemble names
    @GET
    @Path("/{state}/ensemble_details")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEnsemble(@PathParam("state") int state) throws JsonMappingException, JsonProcessingException {

        return result.status(200).entity(fullData.getStates()[state].getEnsemblelist()).build();    			    	
    }
    //Return table of ensemble names
    @GET
    @Path("/{state}/state_details")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStateDetails(@PathParam("state") int state) throws JsonMappingException, JsonProcessingException {

        return result.status(200).entity(fullData.getStates()[state].getStatedetails()).build();    			    	
    }
    
    //Return table of cluster names
    @GET
    @Path("/{state}/{ensembleIndex}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCluster(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getClusters()).build();    			    	
    }
    
    //Return table of plan names
    @GET
    @Path("/{state}/{ensembleIndex}/{clusterIndex}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPlans(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex, @PathParam("clusterIndex") int clusterIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getClusters()[clusterIndex].getPlans()).build();   			    	
    }    
    @GET
    @Path("/{state}/{ensembleIndex}/{clusterIndex}/op")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPlansop(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex, @PathParam("clusterIndex") int clusterIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getClustersop()[clusterIndex].getPlans()).build();   			    	
    } 
    //GUI-7 Display cluster details 
    @GET
    @Path("/{state}/{ensembleIndex}/cluster_details")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getClusterDetails(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getClusterdetails()).build();   			    	
    }
    @GET
    @Path("/{state}/{ensembleIndex}/cluster_detailsop")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getClusterDetailsop(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getClusterdetailsop()).build();   			    	
    }
    //GUI-10 Display the association of clusters with ensemble size
    @GET
    @Path("/{state}/cluster_association_coordinates")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAssociationCoordinates(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getClusterassociationcoordinates()).build();  
    }
    @GET
    @Path("/{state}/cluster_association_coordinatesop")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAssociationCoordinatesop(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getClusterassociationcoordinatesop()).build();  
    }
    //GUI-11 Display cluster details 
    @GET
    @Path("/{state}/{ensembleIndex}/cluster_coordinates")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getClusterCoordinates(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getClustercoordinates()).build();   			    	
    }    
    @GET
    @Path("/{state}/{ensembleIndex}/cluster_coordinatesop")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getClusterCoordinatesop(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getClustercoordinatesop()).build();   			    	
    }    
    //GUI-13 Expand point in cluster scatter plot 
    @GET
    @Path("/{state}/{ensembleIndex}/{clusterIndex}/plan_coordinates")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPlanCoordinates(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex, @PathParam("clusterIndex") int clusterIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getClusters()[clusterIndex].getPlancoordinates()).build();   			    	
    }        
    @GET
    @Path("/{state}/{ensembleIndex}/{clusterIndex}/plan_coordinatesop")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPlanCoordinatesop(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex, @PathParam("clusterIndex") int clusterIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getClustersop()[clusterIndex].getPlancoordinates()).build();   			    	
    }     
    
    @GET
    @Path("/{state}/{ensembleIndex}/average_plans")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAveragePlans(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getAverageplans()).build();   			    	
    }     
    @GET
    @Path("/{state}/{ensembleIndex}/average_plansop")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAveragePlansop(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex) throws JsonMappingException, JsonProcessingException {

        return result.entity(fullData.getStates()[state].getEnsembles()[ensembleIndex].getAverageplansop()).build();   			    	
    }    
    
    //GUI-16 Display district plan
    @GET
    @Path("/{state}/{ensembleIndex}/{districtPlanIndex}/district_plan")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDistrictPlan(@PathParam("state") int state, @PathParam("ensembleIndex") int ensembleIndex, @PathParam("clusterIndex") int clusterIndex, @PathParam("districtPlanIndex") int districtPlanIndex) throws JsonMappingException, JsonProcessingException {   
    	
        Document query = new Document("state_index", state).append("ensemble_index", ensembleIndex).append("plan_index", districtPlanIndex);
    	Document document = dpCollection.find(query).first();    	
        ObjectMapper objectMapper = new ObjectMapper();
        String resultJson = objectMapper.writeValueAsString(document);
        
        if (document != null) {
        	return result.entity(resultJson).build();
        } else {
        	return result.entity("No result found").build();
        }		    	
    }    
}
