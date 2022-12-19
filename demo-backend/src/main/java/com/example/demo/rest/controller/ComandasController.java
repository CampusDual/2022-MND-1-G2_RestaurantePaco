package com.example.demo.rest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.example.demo.dto.ComandaDTO;
import com.example.demo.entity.enums.ResponseCodeEnum;
import com.example.demo.exception.DemoException;
import com.example.demo.rest.response.DataSourceRESTResponse;
import com.example.demo.service.IComandaService;
import com.example.demo.utils.Constant;

@CrossOrigin(origins = { "http://localhost:4201" })
@RestController
@RequestMapping(ComandasController.REQUEST_MAPPING)
public class ComandasController {
	public static final String REQUEST_MAPPING = "contacts";  //SE CAMBIO "comandas" POR "contacts"
	private static final Logger LOGGER = LoggerFactory.getLogger(ComandasController.class);

	@Autowired
	private IComandaService comandaService;

	/**
	 * Obtiene un contacto de BDD con el id indicado.
	 * 
	 * @param id el id del contacto de la BDD.
	 * @return el contacto cuyo id sea el pasado por parámetros.
	 */
	@GetMapping("/getComanda")
	@PreAuthorize("hasAnyAuthority('CONTACTS')")
	public ResponseEntity<?> getComanda(@RequestParam(value = "id") Integer id) {
		LOGGER.info("getComanda in progress...");
		ComandaDTO comanda = null;
		Map<String, Object> response = new HashMap<>();
		ResponseEntity<?> re = null;
		try {
			comanda = comandaService.getComanda(id);
			if (comanda == null) {
				response.put(Constant.MESSAGE, Constant.COMANDA_NOT_EXISTS);
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
				re = new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
			} else {
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				re = new ResponseEntity<>(comanda, HttpStatus.OK);
			}
		} catch (DataAccessException e) {
			LOGGER.error(e.getMessage());
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			response.put(Constant.MESSAGE, Constant.DATABASE_QUERY_ERROR);
			response.put(Constant.ERROR, e.getMessage());
			re = new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
		LOGGER.info("getComanda is finished...");
		return re;
	}


	/**
	 * Llamada REST para obtener usuarios que alguno de sus campos contenga la
	 * 'query' independientemente de las mayúsculas.
	 * 
	 * @return usuarios que alguno de sus campos contenga la 'query'
	 *         independientemente de las mayúsculas.
	 * @since 0.0.5
	 */
	@PostMapping(path = "/getComandas", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('CONTACTS')")
	public @ResponseBody DataSourceRESTResponse<List<ComandaDTO>> getComandas(@RequestBody AnyPageFilter pageFilter) {
		LOGGER.info("getComandas in progress...");
		DataSourceRESTResponse<List<ComandaDTO>> dres = new DataSourceRESTResponse<>();
		try {
			dres = comandaService.getComandas(pageFilter);
		} catch (DemoException e) {
			LOGGER.error(e.getMessage());
			dres.setResponseMessage(e.getMessage());
		}
		LOGGER.info("getComandas is finished...");
		return dres;
	}

	/**
	 * Devuelve todos los contactos que se encuentran en la tabla
	 * 
	 * @return usuarios que alguno de sus campos contenga la 'query'
	 *         independientemente de las mayúsculas.
	 * @since 0.0.5
	 */
	@GetMapping(path = "/getComandas")
	@PreAuthorize("hasAnyAuthority('CONTACTS')")
	public @ResponseBody List<ComandaDTO> findAll() {
		LOGGER.info("findAll in progress...");
		return comandaService.findAll();
	}

	/**
	 * Llamada REST para crear un nuevo usuario en la BDD.
	 * 
	 * @return el id del usuario creado.
	 * @since 0.0.5
	 */
	@PostMapping(path = "/createComanda")
	@PreAuthorize("hasAnyAuthority('CONTACTS')")
	public ResponseEntity<?> createComanda(@Valid @RequestBody ComandaDTO createComandaRequest, BindingResult result) {
		LOGGER.info("createComanda in progress...");
		ComandaDTO comandaNew = null;
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.CREATED;
		String message = Constant.COMANDA_CREATE_SUCCESS;
		if (!result.hasErrors()) {
			try {
				comandaNew = comandaService.createComanda(createComandaRequest);
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
			} catch (DataAccessException e) {
				if (e.getMostSpecificCause().getMessage().contains(Constant.PHONE_ERROR)) {
					message = Constant.PHONE_ALREADY_EXISTS;
					status = HttpStatus.OK;
				} else {
					message = Constant.DATABASE_QUERY_ERROR;
					status = HttpStatus.BAD_REQUEST;
				}

				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
				response.put(Constant.ERROR, e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));

			}
			response.put("comanda", comandaNew);
		} else {
			List<String> errors = new ArrayList<>();
			for (FieldError error : result.getFieldErrors()) {
				errors.add(error.getDefaultMessage());
			}
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.WARNING.getValue());
			message = Constant.COMANDA_NOT_CREATED;
			response.put(Constant.ERROR, errors);
			status = HttpStatus.BAD_REQUEST;
		}

		LOGGER.info("createComanda is finished...");
		response.put(Constant.MESSAGE, message);

		return new ResponseEntity<>(response, status);
	}


	/**
	 * Llamada REST para modificar un usuario en la BDD.
	 * 
	 * @return el id del usuario modificado.
	 * @since 0.0.5
	 */
	@PostMapping(path = "/editComanda", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('CONTACTS')")
	public ResponseEntity<Map<String, Object>> editComanda(@Valid @RequestBody ComandaDTO editComandaRequest, BindingResult result) {
		LOGGER.info("editContact in progress...");
		int id = 0;
		ComandaDTO comandaOlder = comandaService.getComanda(editComandaRequest.getId());
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.CREATED;
		String message = Constant.COMANDA_EDIT_SUCCESS;
		if (comandaOlder != null) {
			if (!result.hasErrors()) {
				try {
					id = comandaService.editComanda(editComandaRequest);
					response.put("comandaid", id);
					response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
				} catch (DataAccessException e) {
					if (e.getMostSpecificCause().getMessage().contains(Constant.PHONE_ERROR)) {
						message = Constant.PHONE_ALREADY_EXISTS;
						status = HttpStatus.OK;
					} else {
						message = Constant.DATABASE_QUERY_ERROR;
						status = HttpStatus.BAD_REQUEST;
					}
					response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
					response.put(Constant.ERROR,
							e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				}

			} else {
				List<String> errors = new ArrayList<>();
				for (FieldError error : result.getFieldErrors()) {
					errors.add(error.getDefaultMessage());
				}
				response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.WARNING.getValue());
				message = Constant.COMANDA_NOT_EDIT;
				response.put(Constant.ERROR, errors);
				status = HttpStatus.OK;
			}
		} else {
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			message = Constant.ID_NOT_EXISTS;
			status = HttpStatus.BAD_REQUEST;
		}

		response.put(Constant.MESSAGE, message);
		LOGGER.info("editComanda is finished...");
		return new ResponseEntity<>(response, status);

	}


	/**
	 * Elimina un usuario de la BDD.
	 * 
	 * @return el id del usuario eliminado.
	 * @since 0.0.5
	 */
	@DeleteMapping("/deleteComanda")
	@PreAuthorize("hasAnyAuthority('CONTACTS')")
	public ResponseEntity<?> deleteComanda(@RequestParam(value = "id") Integer id) {
		LOGGER.info("deleteContact in progress...");
		Map<String, Object> response = new HashMap<>();
		HttpStatus status = HttpStatus.OK;
		String message = Constant.COMANDA_DELETE_SUCCESS;
		try {
			comandaService.deleteComanda(id);
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.OK.getValue());
		} catch (DataAccessException e) {
			response.put(Constant.MESSAGE, Constant.DATABASE_QUERY_ERROR);
			response.put(Constant.ERROR, e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			response.put(Constant.RESPONSE_CODE, ResponseCodeEnum.KO.getValue());
			status = HttpStatus.BAD_REQUEST;
			message = Constant.COMANDA_NOT_DELETE;
		}
		response.put(Constant.MESSAGE, message);
		LOGGER.info("deleteComanda is finished...");
		return new ResponseEntity<>(response, status);
	}
}
