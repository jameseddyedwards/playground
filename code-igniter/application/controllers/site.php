<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Site extends CI_Controller {

	public function index(){
		$this->home($data);
	}

	public function home(){
		$data['title'] = "Welcome!";
		$this->load->view("home", $data);
	}

	public function addStuff(){
		$this->load->model("math");
		echo $this->math->add();
	}

}