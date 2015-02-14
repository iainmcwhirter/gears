$(document).ready(function()
{
	$('#search_query').keyup(function()
	{
		if($('#search_query').val().length>2)
		{
			//alert($('#search_query').val());
			$.ajax(
			{
				type: 'post',
				url: config.base_url+'search', 
				cache: false,
				data:'search_query='+$('#search_query').val(),
				success: function(response)
				{
					$('#search_results').html('');
					var obj = JSON.parse(response);
					if(obj.length>0)
					{
						try
						{
							$('#search_results').append('<h1>Searching on Portfolio, Customer, Project, PO Number, Vantive ID & PSF ID</h1>');
							var items=[];
							$.each(obj, function(i,val)
							{
								str = $('<li/>').html(val.prt_name+' - <a href="'+config.base_url+'customer/id/'+val.cst_id+'">'+val.cst_name+'</a> - <a href="'+config.base_url+'project/id/'+val.prj_id+'">'+val.prj_name+'</a>');
								items.push(str);
							});
							$('#search_results').show();
							$('#search_results').append.apply($('#search_results'), items);
						}catch(e) {
							alert('Exception while searching for data');
						}
					}else{
						$('#search_results').show();
						$('#search_results').html($('<li/>').text('No Data Found'));
					}
				},
				error: function()
				{
					alert('Error while searching for data');
				}
			});
		} else {
			$('#search_results').hide();
		}
		return false;
	});
});


function numberWithCommas(x) {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}