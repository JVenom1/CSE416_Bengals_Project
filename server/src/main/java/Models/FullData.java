package Models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"_id"})
public class FullData {

	private String _id;
	private States[] states;
	
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public States[] getStates() {
		return states;
	}
	public void setStates(States[] states) {
		this.states = states;
	}
}	
