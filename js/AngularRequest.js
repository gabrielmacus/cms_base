
function postData($http,json,url,success,error) {
	// body...

	$http({method:"POST",url:url,data:$.param(json),headers:{'Content-Type':'application/x-www-form-urlencoded'}})
	.then(success,error);

}

	function getData($http,url,success,error) {
		// body...
			$http({method:"GET",url:url,headers:{'Content-Type':'application/x-www-form-urlencoded'}})
	.then(success,error);}


function uploadFiles(angularHttp, url,files,callback,error)
{
	var formData = new FormData();

	$.each(files,function (index,file) {


		formData.append(file.name, file);
	})




	angularHttp.post(url, formData, {
				withCredentials: false,
				headers: {
					'Content-Type': undefined
				},
				transformRequest: angular.identity
			})
			.success(function (data) {

				if(callback)
				{
					callback(data);
				}


			})
			.error(function (data) {

				if(error)
				{
					error();
				}

			});
}
function uploadData(angularHttp, url,files,json,callback,error)
{
	var formData = new FormData();

	$.each(files,function (index,file) {


		formData.append(file.name, file);
	})

	formData.append("json",JSON.stringify(json));



	angularHttp.post(url, formData, {
				withCredentials: false,
				headers: {
					'Content-Type': undefined
				},
				transformRequest: angular.identity
			})
			.success(function (data) {

				if(callback)
				{
					callback(data);
				}


			})
			.error(function (data) {

				if(error)
				{
					error();
				}

			});
}
